# Google Form Clone

This repository contains a Google-Forms-like demo with a React + Vite frontend and a Node + Express backend.

Overview
- Frontend: `client/` — React (Vite), Tailwind CSS, react-hook-form, Zod validation, react-select, and reusable controlled components.
- Backend: `server/` — Express, Mongoose (MongoDB) persistence, Zod validation for incoming requests, and route controllers.

Quick start
 - Start MongoDB locally (or set `MONGODB_URI` in `server/.env`).
 - Start server:
   ```bash
   cd server
   npm install
   npm start
   ```
 - Start client:
   ```bash
   cd client
   npm install
   npm run dev
   ```

Notes
- `node_modules` are intentionally excluded from the repo. Use `npm install` in each folder before running.
- The server uses a unique index on `email` to prevent duplicate submissions.
# google-form-clone
