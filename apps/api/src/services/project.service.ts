import { prisma } from '../config/database.js';
import { ProjectState, ProjectType, SnapshotReason } from '@saasx/shared';

// DEV_MOCK_USER_ID and ensureDevUser() have been removed to enforce real identities.

export async function createProject(userId: string, data: { name: string; description?: string; type: ProjectType; state: ProjectState }) {
  return await prisma.$transaction(async (tx) => {
    // Ensure user exists in our local Prisma database since they originate from Supabase Auth
    const existingUser = await tx.user.findUnique({ where: { id: userId } });
    if (!existingUser) {
      await tx.user.create({
        data: {
          id: userId,
          email: 'unknown@example.com', // Typically synced via webhook, placeholder for now
        }
      });
    }

    const project = await tx.project.create({
      data: {
        ownerId: userId,
        name: data.name,
        description: data.description,
        type: data.type,
        state: data.state as any,
      },
    });

    await tx.projectSnapshot.create({
      data: {
        projectId: project.id,
        state: data.state as any,
        reason: SnapshotReason.INITIAL_GENERATION,
      },
    });

    return project;
  });
}

export async function getProjectById(userId: string, projectId: string) {
  return await prisma.project.findFirst({
    where: {
      id: projectId,
      ownerId: userId
    },
  });
}

export async function listProjectsByOwner(userId: string) {
  return await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function updateProjectState(userId: string, projectId: string, state: ProjectState, reason: SnapshotReason = SnapshotReason.MANUAL_SAVE) {
  // Authorization check
  const project = await getProjectById(userId, projectId);
  if (!project) {
    return null; // Return null so the controller can throw 404
  }

  return await prisma.$transaction(async (tx) => {
    const updated = await tx.project.update({
      where: { id: projectId },
      data: {
        state: state as any,
      },
    });

    await tx.projectSnapshot.create({
      data: {
        projectId,
        state: state as any,
        reason,
      },
    });

    return updated;
  });
}

export async function createProjectSnapshot(userId: string, projectId: string, state: ProjectState, reason: SnapshotReason) {
  const project = await getProjectById(userId, projectId);
  if (!project) return null;

  return await prisma.projectSnapshot.create({
    data: {
      projectId,
      state: state as any,
      reason,
    },
  });
}

export async function getProjectSnapshots(userId: string, projectId: string) {
  const project = await getProjectById(userId, projectId);
  if (!project) return null;

  return await prisma.projectSnapshot.findMany({
    where: { projectId },
    orderBy: { createdAt: 'desc' },
  });
}
