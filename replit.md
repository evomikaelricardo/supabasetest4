# REST API Platform with Supabase

## Project Overview
This is a full-stack REST API platform built with:
- **Frontend**: React + Vite + Wouter + Tailwind CSS + shadcn/ui
- **Backend**: Express.js + TypeScript
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase SDK (@supabase/supabase-js)


## Architecture
- Full-stack app running on a single port (5000)
- Express server serves both API routes and the Vite frontend
- Supabase for database with Bearer token authentication
- API-first design with token-based access control

## Important: Database Configuration
**This application uses Supabase PostgreSQL database, NOT Replit's local PostgreSQL database.**
- All database operations go through Supabase using `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- The app connects to Supabase via the `@supabase/supabase-js` SDK
- Do not use Replit's built-in PostgreSQL database for this project

### First-Time Setup from GitHub Import
When this app is first imported from GitHub to Replit:
1. The user will be prompted to enter `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
2. These values will be securely stored in Replit Secrets (not in code or version control)
3. The app will automatically access these secrets as environment variables

## Database Models
- **API Tokens**: For Bearer token authentication
- **Items**: Core entity with CRUD operations
- **Customers**: Customer management
- **Conversation Memory**: Conversation data storage

## Environment Setup Required

### Supabase Configuration
This app requires Supabase credentials. You need to:

1. **Create a Supabase Project**:
   - Go to [Supabase Dashboard](https://supabase.com/dashboard/projects)
   - Create a new project
   - Wait for the project to be fully provisioned

2. **Get Your Credentials**:
   
   **For SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY** (used by app):
   - In your Supabase project, go to Settings > API
   - Copy the "URL" (this is your SUPABASE_URL)
   - Copy the "service_role" key under "Project API keys" (this is your SUPABASE_SERVICE_ROLE_KEY)
   
3. **Add to Replit Secrets**:
   - Add `SUPABASE_URL` with your project URL
   - Add `SUPABASE_SERVICE_ROLE_KEY` with your service role key

4. **Set Up Database Tables**:
   - Run `npm run db:push` to create the database schema

## Current Status
- **Dependencies**: ✅ Installed (490 packages)
- **Workflow**: ✅ Configured (port 5000, webview output)
- **Supabase**: ✅ Connected and configured
- **Database Schema**: ✅ Synced with Supabase
- **Application**: ✅ Running successfully

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema to Supabase
- `npm run check` - Type check TypeScript

## Recent Changes
- 2025-10-02: GitHub import successfully configured for Replit
  - Updated npm scripts to use npx for tool execution compatibility
  - Workflow configured for port 5000 with webview output
  - Supabase connection verified and working
  - Database schema verified as synced
  - Vite configured with `allowedHosts: true` for Replit proxy
  - Application fully operational on port 5000 (0.0.0.0)
  - Deployment configuration set for autoscale
