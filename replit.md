# Overview

This is a full-stack lead generation web application built with React and Express. The application provides a landing page with a contact form that captures leads (name, email, phone, message) and stores them in a PostgreSQL database. It uses a modern TypeScript-first approach with shared type definitions between frontend and backend.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack React Query for server state
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for smooth transitions
- **Build Tool**: Vite with path aliases (@/ for client/src, @shared/ for shared)

## Backend Architecture
- **Runtime**: Node.js with Express 5
- **API Design**: RESTful endpoints defined in shared/routes.ts with Zod schemas for request/response validation
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Type Safety**: Shared schema between frontend and backend via drizzle-zod

## Data Layer
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema Location**: shared/schema.ts defines all tables
- **Migrations**: Drizzle Kit for schema management (npm run db:push)
- **Current Tables**: 
  - `leads` - stores contact form submissions (id, name, email, phone, message, createdAt)

## API Structure
- Routes are defined declaratively in shared/routes.ts with full type information
- Each route specifies: method, path, input schema, and response schemas
- Frontend uses these same definitions for type-safe API calls
- Storage layer (server/storage.ts) abstracts database operations

## Build Process
- Development: Vite dev server with HMR, Express backend via tsx
- Production: Vite builds frontend to dist/public, esbuild bundles server to dist/index.cjs
- Server dependencies are selectively bundled to reduce cold start times

# External Dependencies

## Database
- **PostgreSQL**: Primary data store, connection via DATABASE_URL environment variable
- **connect-pg-simple**: Session storage (available but not currently used)

## UI/Styling
- **Google Fonts**: Inter (body) and Outfit (display) fonts loaded via CDN
- **Radix UI**: Headless component primitives for accessibility
- **Lucide React**: Icon library

## Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development banner