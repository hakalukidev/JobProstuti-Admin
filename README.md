# Job Prostuti Admin

Job Prostuti Admin is a Next.js-based admin dashboard for managing users, exams, jobs, questions, reports, notifications, subscriptions, FAQ content, and settings in one place.

## Overview

The application ships with a protected admin experience, a demo login page, and a shared sidebar-driven layout for the main dashboard sections. Authentication is handled with a lightweight cookie-based middleware so unauthorized users are redirected to `/login`.

## Features

- Protected routes with middleware-based access control.
- Demo login flow for local and preview environments.
- Dashboard analytics cards, activity feeds, and section placeholders.
- Shared admin navigation across the core management pages.
- Responsive UI optimized for desktop and tablet use.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Heroicons
- Recharts
- Axios
- React Hot Toast

## Project Structure

- `app/` - Next.js app routes, pages, and layouts.
- `components/` - Shared UI building blocks such as the sidebar and section shell.
- `middleware.ts` - Cookie-based route protection.
- `public/` - Static assets.
- `lib/`, `services/`, `hooks/`, `utils/`, `types/` - Shared application code.

## Prerequisites

- Node.js 18 or newer
- npm, pnpm, yarn, or bun

## Setup

1. Install dependencies.

```bash
npm install
```

2. Create your local environment file.

```bash
cp .env.example .env.local
```

3. Start the development server.

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

The current app works with the demo credentials below, and these can be overridden through `.env.local`.

- `NEXT_PUBLIC_DEMO_ADMIN_EMAIL` - Demo admin login email.
- `NEXT_PUBLIC_DEMO_ADMIN_PASSWORD` - Demo admin login password.

Default values:

- Email: `admin@jobprostuti.com`
- Password: `admin123`

## Authentication Flow

1. The login page validates the demo credentials.
2. On success, the app stores an `isLoggedIn=true` cookie.
3. `middleware.ts` checks that cookie and redirects unauthorized users to `/login`.
4. The sidebar logout action clears the cookie and returns the user to the login page.

## Available Scripts

- `npm run dev` - Start the local development server.
- `npm run build` - Build the app for production.
- `npm run start` - Run the production build.
- `npm run lint` - Run ESLint.

## Main Sections

- Dashboard
- Users
- Questions
- Exams
- Jobs
- Reports
- Notifications
- Subscriptions
- FAQ
- Settings

## Notes

- This repository currently uses a demo authentication flow, so it is suitable for internal admin demos and frontend development.
- If you later connect a real backend, keep the cookie-based middleware contract or update the route guard accordingly.

## Deployment

This project can be deployed like any standard Next.js application. Make sure the production environment includes the same `.env.local` values or platform variables required by your deployment setup.