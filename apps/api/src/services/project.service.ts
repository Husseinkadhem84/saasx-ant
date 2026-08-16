import { prisma } from '../config/database.js';
import { ProjectState, ProjectType, SnapshotReason } from '@saasx/shared';

// Temporary mock user ID for development since auth is not implemented
const DEV_MOCK_USER_ID = 'dev-mock-user-123';

/**
 * Ensures the mock user exists for local development.
 * This should be removed in Phase 3 when real auth is added.
 */
async function ensureDevUser() {
  if (process.env.NODE_ENV !== 'production') {
    const existing = await prisma.user.findUnique({ where: { id: DEV_MOCK_USER_ID } });
    if (!existing) {
      // Catch error in case it gets created concurrently
      try {
        await prisma.user.create({
          data: {
            id: DEV_MOCK_USER_ID,
            email: 'dev@saasx.local',
            name: 'Dev User',
          }
        });
      } catch (e) {
        // Ignore unique constraint violations
      }
    }
  }
  return DEV_MOCK_USER_ID;
}

export async function createProject(data: { name: string; description?: string; type: ProjectType; state: ProjectState }) {
  const ownerId = await ensureDevUser();
  
  return await prisma.$transaction(async (tx) => {
    const project = await tx.project.create({
      data: {
        ownerId,
        name: data.name,
        description: data.description,
        type: data.type,
        // Convert the typed state to an untyped JSON object for Prisma
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

export async function getProjectById(id: string) {
  return await prisma.project.findUnique({
    where: { id },
  });
}

export async function listProjectsByOwner() {
  const ownerId = await ensureDevUser();
  return await prisma.project.findMany({
    where: { ownerId },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function updateProjectState(id: string, state: ProjectState, reason: SnapshotReason = SnapshotReason.MANUAL_SAVE) {
  return await prisma.$transaction(async (tx) => {
    const project = await tx.project.update({
      where: { id },
      data: {
        state: state as any,
      },
    });

    await tx.projectSnapshot.create({
      data: {
        projectId: project.id,
        state: state as any,
        reason,
      },
    });

    return project;
  });
}

export async function createProjectSnapshot(projectId: string, state: ProjectState, reason: SnapshotReason) {
  return await prisma.projectSnapshot.create({
    data: {
      projectId,
      state: state as any,
      reason,
    },
  });
}

export async function getProjectSnapshots(projectId: string) {
  return await prisma.projectSnapshot.findMany({
    where: { projectId },
    orderBy: { createdAt: 'desc' },
  });
}
