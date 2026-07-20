# Viral Protest Support Platform

A production-quality, modern web application that allows people to publicly support a movement by generating a personalized digital supporter card for sharing across social media.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Animations:** Framer Motion
- **Authentication:** NextAuth.js (Auth.js v5) with Google OAuth
- **Database:** Prisma ORM (SQLite for dev, ready for PostgreSQL)
- **Image Generation:** `next/og`

## Features
- Google OAuth Login (passwordless)
- Atomic Sequential Supporter Number Assignment
- Live Polling Supporter Counter
- Personalized Dynamic Supporter Card Generation (`/api/card/[id]`)
- One-Click Social Sharing (X, LinkedIn)
- Public Profile Pages
- Beautiful Dark Mode Minimalist UI

## Prerequisites
- Node.js >= 18
- NPM / PNPM / Yarn

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   AUTH_SECRET="generate-a-strong-secret-here"
   AUTH_GOOGLE_ID="your-google-client-id"
   AUTH_GOOGLE_SECRET="your-google-client-secret"
   ```

3. **Database Setup (Prisma)**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run Locally**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Deployment (Vercel)
1. Push to GitHub.
2. Import project in Vercel.
3. Set the Environment Variables (`DATABASE_URL`, `AUTH_SECRET`, etc.).
   *(If moving to PostgreSQL, update the Prisma schema provider from `sqlite` to `postgresql` before deploying).*
4. Deploy!

## Scalability Notes
This project uses server-side logic and database transactions to ensure sequential atomic assignment of supporter numbers without race conditions. Dynamic images are generated on-the-fly and can be easily cached with a CDN in production.
