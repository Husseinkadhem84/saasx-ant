# SAASX — Next-Gen AI System & Automation Architecture Builder

<div align="center">

<img src="./assets/saasx-logo.svg" width="260" alt="SAASX Logo" />

**Transform natural language requirements into full-stack SaaS architectures, interactive workflows, database schemas, and self-hosted automation pipelines.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini_AI-2.4-8E75B2?style=for-the-badge&logo=google)](https://ai.google.dev/)

[Explore Features](#-key-features) • [Architecture](#-system-architecture) • [Quick Start](#-quick-start) • [Security](#-security--reliability) • [Roadmap](#-future-roadmap)

---

</div>

## 📖 Table of Contents

- [Overview & Project Identity](#-overview--project-identity)
- [Mission & Core Objectives](#-mission--core-objectives)
- [Key Features & Capabilities](#-key-features--capabilities)
- [Monorepo Architecture](#-monorepo-architecture)
- [Technology Stack](#-technology-stack)
- [Quick Start Guide](#-quick-start-guide)
  - [Prerequisites](#prerequisites)
  - [Environment Configuration](#environment-configuration)
  - [Installation & Execution](#installation--execution)
  - [Available Scripts](#available-scripts)
- [Security & Reliability](#-security--reliability)
- [Database & State Architecture](#-database--state-architecture)
- [Future Roadmap](#-future-roadmap)
- [License](#-license)

---

## 🌟 Overview & Project Identity

**SAASX** is an advanced, AI-native platform designed to bridge the gap between abstract business requirements and production-grade software architectures. 

By utilizing Google Gemini AI models and modular orchestration engines, SAASX allows software engineers, product teams, and founders to describe any digital system or workflow in plain language (Arabic or English) and instantly generates:
1. **Interactive Workflow Graphs** with visual node linkages and reactive data streams.
2. **Dynamic UI Views & Forms** for customer-facing interfaces and admin controls.
3. **Relational Database Schemas** (Supabase/PostgreSQL) complete with Row Level Security (RLS) policies.
4. **n8n Automation Pipelines & Docker Containers** for self-hosted execution.
5. **Localized Payment Gateway Sandboxes** (e.g., ZainCash QR/redirect flows, Qi Card, and digital wallets).

Everything is delivered within a futuristic **"Liquid Glass"** cyberpunk dark interface crafted for speed, clarity, and visual excellence.

---

## 🎯 Mission & Core Objectives

Traditional SaaS and automation development requires stitching together disjointed tools for diagramming, database design, frontend scaffolding, backend APIs, and webhook automation.

**SAASX unifies the entire lifecycle into a single AI-driven pipeline:**
- **Zero-Friction System Generation:** Describe your application (e.g., *"A clinic appointment system with patient records, ZainCash deposit payment, Supabase storage, and WhatsApp reminders via n8n"*) and get a complete blueprint in seconds.
- **Visual & Executable Verification:** Simulate node-by-node execution flows in real time with animated electric edges and live state transitions.
- **Enterprise-Ready Infrastructure Out of the Box:** Generate production-ready SQL migrations, Docker Compose manifests, and sanitized API endpoints instead of static mockups.
- **Localized Regional Integrations:** Tailored support for Middle Eastern payment gateways and communication channels alongside global cloud primitives.

---

## ⚡ Key Features & Capabilities

### 🧠 1. AI-Powered System Architect
- Powered by `@google/genai` (Gemini 2.4+) with fallback template systems.
- Understands complex, multi-layered requirements in both Arabic and English.
- Automatically constructs node topologies, data contracts, and environment variables.

### 🎨 2. Visual Workflow Canvas (`@xyflow/react`)
- **Rich Node Types:** Triggers, UI Forms, AI Models, Supabase Relational DBs, Payment Gateways, n8n Core Nodes, and Notification Services.
- **Dynamic Interaction:** Drag-and-drop node placement, custom edge links, and animated electric connection lines.
- **Node Detail Drawer:** Deep inspection of node configurations, payloads, schema parameters, and connected metadata.
- **Live Run Simulation:** Animate and step through workflow execution flows with realistic status indicators (`running`, `success`, `error`).

### 🖥️ 3. Instant Generated UI Sandbox
- Renders functional interactive forms, booking flows, and dashboards matching the generated system schema.
- Real-time client-side state handling and form validation testing.

### 🗄️ 4. Supabase & PostgreSQL Architecture Generator
- Generates fully normalized relational tables with typed fields (`uuid`, `text`, `decimal`, `timestamp`, etc.).
- Produces automated **Row Level Security (RLS)** SQL policies (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) tailored to authenticated users and service roles.

### 🔄 5. n8n Core & Docker Orchestration
- Generates comprehensive `docker-compose.yml` configurations with persistent volumes, network bridges, and environment variables for local or VPS deployment.
- Exports n8n workflow triggers, webhook pathways, and JSON schemas ready for import into any self-hosted n8n instance.

### 💳 6. Localized Payment Gateway Sandboxes
- Embedded simulation sandboxes for regional payment providers (such as **ZainCash** QR generation and redirect handshakes) as well as global payment patterns.
- Interactive transaction lifecycle testing (Initiation $\rightarrow$ Tokenization $\rightarrow$ Webhook verification $\rightarrow$ Confirmation).

### 📚 7. Pre-built Domain Templates
- Out-of-the-box system templates for rapid prototyping:
  - **Restaurant POS & Kitchen Flow** (Orders, AI order optimization, ZainCash, WhatsApp notifications).
  - **E-Commerce & Smart Logistics** (Inventory, Payment reconciliation, Courier webhooks).
  - **Medical Clinic & Booking Hub** (Patient records, Appointment slots, SMS reminders).
  - **Real Estate & Property CRM** (Lead intake, Valuation AI, Contract storage).

### 💎 8. Liquid Glass Aesthetic & Modern UX
- Custom-built glassmorphism design system with glowing gradients, backdrop blurs, and dark theme optimization.
- Fluid micro-interactions and transitions powered by `motion` (Framer Motion) and `lucide-react` iconography.

---

## 🏗️ Monorepo Architecture

SAASX is structured as an **npm workspaces** monorepo, ensuring clear separation of concerns, strict type-safety, and modular scaling:

```
saasx/
├── apps/
│   ├── api/                     # Node.js + Express backend service
│   │   ├── src/
│   │   │   ├── config/          # Environment & runtime configuration
│   │   │   ├── controllers/     # API request handlers (AI, Projects, System)
│   │   │   ├── middleware/      # Security (Rate limiting, Helmet, Zod validation)
│   │   │   ├── routes/          # Express REST API endpoints
│   │   │   ├── services/        # Business logic (Gemini AI, Prisma, System gen)
│   │   │   ├── server.ts        # Server entry point
│   │   │   └── app.ts           # Express application setup
│   │   └── package.json
│   │
│   └── web/                     # React 19 + Vite frontend application
│       ├── src/
│       │   ├── components/      # UI components (Canvas, Chat, Drawers, Sandboxes)
│       │   ├── data/            # Pre-built system templates & schemas
│       │   ├── services/        # API client & generation services
│       │   ├── index.css        # TailwindCSS v4 design system & glass styles
│       │   ├── App.tsx          # Main application orchestrator
│       │   └── main.tsx         # Frontend bootstrap
│       └── package.json
│
├── packages/
│   └── shared/                  # Universal TypeScript types & schemas
│       ├── src/
│       │   └── index.ts         # Shared interfaces (ProjectState, Node, Enums)
│       └── package.json
│
├── docs/                        # Architecture & security specifications
│   ├── architecture-status.md   # Deployment roadmap & runtime layers
│   ├── backend-security.md      # Security protections, rate limiting & headers
│   └── database-architecture.md # Prisma & Supabase PostgreSQL data models
│
├── .env.example                 # Example root environment variables
└── package.json                 # Monorepo workspace configuration
```

---

## 💻 Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite 6, TailwindCSS v4, `@xyflow/react`, `motion` (Framer Motion), `lucide-react` |
| **Backend API** | Node.js (ESM), Express 4, TypeScript, `tsx`, `esbuild` |
| **AI Engine** | Google Gemini API (`@google/genai` v2.4+), structured JSON generation |
| **Database & ORM** | Supabase PostgreSQL, Prisma 5.22, JSONB state containers |
| **Security & Middleware** | Helmet, CORS, Express Rate Limit, Zod validation schemas |
| **Orchestration & Tools** | Docker Compose, n8n Workflow Automation, Webhooks |
| **Testing** | Vitest, Supertest |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or pnpm/yarn)
- **Gemini API Key**: (Optional for live AI generation; falls back to built-in templates when unset)

---

### Environment Configuration

1. Clone the repository:
   ```bash
   git clone https://github.com/Husseinkadhem84/saasx-ant.git
   cd saasx-ant
   ```

2. Copy the sample environment file:
   ```bash
   cp .env.example .env
   ```

3. Configure your `.env` parameters:
   ```env
   # Server Configuration
   NODE_ENV="development"
   PORT="3001"
   CORS_ORIGIN="http://localhost:3000"

   # Database (Supabase PostgreSQL connection string)
   DATABASE_URL="postgresql://user:password@host:port/database?pgbouncer=true"

   # Security & Rate Limiting
   API_RATE_LIMIT_WINDOW_MS="900000"
   API_RATE_LIMIT_MAX="100"
   AI_RATE_LIMIT_WINDOW_MS="3600000"
   AI_RATE_LIMIT_MAX="20"

   # AI Provider
   GEMINI_API_KEY="your-google-gemini-api-key"
   ```

---

### Installation & Execution

1. **Install all monorepo dependencies:**
   ```bash
   npm install
   ```

2. **Run all workspaces in development mode:**
   ```bash
   npm run dev
   ```
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **Backend API:** [http://localhost:3001](http://localhost:3001)

---

### Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs both `apps/web` and `apps/api` concurrently with hot reloading |
| `npm run build` | Builds all packages and applications for production |
| `npm run test` | Runs unit and integration test suites via Vitest |
| `npm run typecheck` | Validates TypeScript types across all workspaces without emitting files |
| `npm run lint` | Runs code quality checks across the codebase |

---

## 🛡️ Security & Reliability

SAASX enforces a multi-layered security model on the backend:

- **🔒 HTTP Header Hardening:** Configured with `helmet` to mitigate XSS, MIME-sniffing, and clickjacking attacks.
- **🌐 Strict CORS Policies:** Explicitly restricts API access to authorized domain origins configured via `CORS_ORIGIN`. Wildcard origins (`*`) are strictly blocked.
- **🚦 Tiered Rate Limiting:**
  - **General API Limiter:** Protects standard REST endpoints from traffic bursts.
  - **AI Generation Limiter:** Dedicated rate limiter on `/api/generate-workflow` to prevent token exhaustion and API misuse.
- **🛡️ Strict Zod Validation:** Incoming payloads, query parameters, and JSONB structures are verified against schemas prior to controller execution.
- **📦 Payload Constraints:** JSON body size capped at `1mb` to prevent payload-based Denial of Service (DoS).
- **🛑 Sanitized Error Responses:** Centralized error-handling middleware ensures database stack traces and internal exceptions are never leaked to clients in production.

---

## 🗄️ Database & State Architecture

- **Canonical State Store:** All canvas configurations, screen schemas, and workflow nodes are serialized into validated `JSONB` structures (`ProjectState`), allowing rapid prototyping without frequent database schema migrations.
- **Point-in-Time Snapshots:** The `ProjectSnapshot` model enables version control, undo/redo mechanisms, and audit histories (`MANUAL_SAVE`, `AI_EDIT`, `INITIAL_GENERATION`).
- **Credential Isolation:** The database connection pool (`DATABASE_URL`) and service role keys remain strictly contained within the backend environment.

---

## 🗺️ Future Roadmap

- [ ] **Full Supabase Auth Integration:** Real user identity verification, OAuth providers, and multi-tenant Row Level Security (RLS).
- [ ] **OpenRouter & Multi-LLM Support:** Seamless switching between Google Gemini, Claude 3.5 Sonnet, DeepSeek, and OpenAI GPT-4o.
- [ ] **Direct n8n Cloud Deployment:** One-click deployment of generated workflows directly to live n8n cloud instances via REST APIs.
- [ ] **Export to Full-Stack Codebase:** Direct export to runnable Next.js / Supabase GitHub repositories.
- [ ] **Real Payment Gateway SDKs:** Live cryptographic webhook signing and validation for ZainCash, FastPay, and Stripe.

---

## 📄 License

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute according to the license terms.

<div align="center">

**Built with precision by the SAASX Team.**

</div>
