# SAASX Database Architecture

## Technology Stack
- **Database:** Supabase PostgreSQL
- **ORM:** Prisma
- **State Serialization:** JSONB (`ProjectState`)

## Roles and Responsibilities
- **Supabase:** Hosts the production relational data. We do NOT use the Supabase frontend JS client for direct database mutations. Instead, we use it strictly as a PostgreSQL host accessed via standard connection pools.
- **PostgreSQL:** Enforces referential integrity, cascading deletes, and provides `JSONB` support.
- **Prisma:** Acts as our typed backend query builder and migration manager. Generates types synchronized with our PostgreSQL schema.

## Core Models

### User
The foundational identity model. Currently stores mock identity and serves as the anchor point for Projects. Authentication mechanisms (passwords, OAuth, Supabase Auth) are intentionally deferred to future phases.

### Project
The canonical source of truth for the platform.
Instead of treating frontend canvas views as the source of truth, all application state originates here.
Contains standard relational metadata (name, description, owner) and an extensible `JSONB` state container.
Types are enumerated (`AUTOMATION`, `WEB`, `MOBILE`, `SAAS`) to allow future expansions.

### Project State (JSONB)
A flexible JSON schema validated via Zod. This allows rapid iteration on Canvas elements (Nodes, Screens, Workflows) without causing heavy schema migration churn.

### ProjectSnapshot
Records point-in-time states of the Project for version control, undo/redo, and history tracking. Contains a `SnapshotReason` enum (e.g., `MANUAL_SAVE`, `AI_EDIT`).

### Conversation & ConversationMessage
Foundation for tracking interactions between the `USER`, `SYSTEM`, and `ASSISTANT`. Currently pre-configured to store instructions for future OpenRouter/AI agent integrations.

## Security Boundaries
1. **Credentials Isolation:** `DATABASE_URL` is kept strictly within the backend `apps/api/.env`. The frontend never receives database credentials, Prisma URLs, or Supabase service role keys.
2. **Access Abstraction:** Controllers never call `PrismaClient` directly. All operations pass through `apps/api/src/services/project.service.ts` to ensure centralized validation.
3. **Zod Validation:** All incoming `JSONB` structures are run through strict Zod validators to reject completely malformed state shapes before Prisma touches the database.

## Future Auth
Authentication will introduce a real Supabase Auth layer. The existing `ownerId` foreign key relies on an ephemeral mocked user ID for local development continuity, which will be migrated to real Supabase UUIDs.
