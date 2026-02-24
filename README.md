# Google Form Clone

This repository is a self-contained demo that implements a single-submit web form with a modern React front-end and a small Node + Express back-end. It was created as an assignment-style project to demonstrate form design, validation, client/server flow, and a simple single-submission prevention mechanism.

**What this project contains**

- Front-end: a React application built with Vite located in the `client/` folder. The UI uses Tailwind CSS and a set of reusable controlled components built on `react-hook-form`. Validation is performed with Zod and the UI shows inline errors and success/failure toasts.
- Back-end: a minimal Express server located in the `server/` folder. The server persists submissions to MongoDB via Mongoose, validates incoming data, and returns clear HTTP status codes and messages (including a 409 conflict when a duplicate submission is attempted by email).

**Key features and behavior**

- Single-submit flow: the front-end persists a small record in the browser's localStorage when a user submits the form. On subsequent visits the app checks localStorage and prevents another submission from that browser, showing a friendly message with the stored email and submission time.
- Server-side duplicate prevention: the server also enforces uniqueness (via a unique index on the `email` field in MongoDB). If a submission attempts to reuse an existing email, the server responds with HTTP 409 and an explanatory message. The front-end handles that response by showing an error toast and storing the submission locally.
- Validation: inputs are validated on the client (Zod + react-hook-form) and on the server (Zod). Errors are surfaced to the user with inline messages and toasts.
- Reusable components: the client contains components such as `TextField`, `RadioGroup`, `CheckboxGroup`, `SelectField`, `TextArea`, `SectionCard`, and `Toast` to demonstrate form composition and controlled inputs.

**Project structure (high level)**

- `client/` — React front-end using Vite. Contains `src/` with components and pages. Tailwind CSS configuration and Vite config are included.
- `server/` — Express back-end, controllers, models, and route definitions. Contains a connection helper for MongoDB.
- `db/`, `models/`, `controllers/`, `routes/` under `server/` implement the API and persistence logic.

**Data model (summary)**

- The primary persisted entity is a Submission with fields such as fullName, email, age, gender, hobbies (array), country, about, agreement flag, education fields, job details, and optional links (linkedin, website). The server uses Mongoose to enforce schema shape and a unique index on `email` to avoid duplicates.

**API contract**

- Endpoint: POST to `/submit` (server-side path). The server expects JSON matching the form shape. On success the server returns an OK response. If validation fails the server returns a 4xx with details. If a submission is duplicate the server returns 409 Conflict.

**Environment & configuration**

- MongoDB: the back-end expects a MongoDB connection string. Set the appropriate environment variable (for example `MONGODB_URI`) for the server to connect to your MongoDB instance. Alternatively run a local MongoDB instance and point the server at it.
- Ports: the project assumes the server runs on a local port (the client POSTs to `http://localhost:5010/submit` in the current code). If you change the server port or host, update the front-end fetch URL accordingly.

**How to run (developer steps)**

- Install dependencies for both root subfolders: run dependency install in `server/` and `client/` (for example, `cd server` then install, and `cd client` then install). Ensure you have Node.js and npm installed.
- Start the back-end: run the server start command in the `server/` folder and confirm it connects to MongoDB.
- Start the front-end: run the dev server from the `client/` folder and open the UI in a browser. The client will POST JSON to the server when submitting the form.
- Or through the root folder `npm run i-all`, `npm run dev`. It will install dependencies for both server and client and run the both workspaces at once.

**Local single-submit behavior (details & rationale)**

- The app implements two layers of single-submit prevention: localStorage on the client and a unique index on the server. This combination demonstrates the pattern used in many simple demos where the UX is improved by preventing repeated submissions from the same browser while the server enforces true uniqueness across all clients.
- Client side: after a successful submission, the front-end stores an object in localStorage under `form_submitted` containing the submitted email and the timestamp. On app load the front-end reads that key and, if present, sets a blocked state that shows a read-only message instead of the form.
- Server side: the Mongoose schema includes a unique constraint on the `email` field. If an incoming submission violates that uniqueness, the server returns HTTP 409. The front-end treats a 409 as a sign the form was already submitted and stores the local record as well.

**Validation and UX notes**

- Validation occurs on both client and server. The client uses Zod schemas wired into `react-hook-form` via `zodResolver`, allowing concise validation rules and informative inline messages. The server runs the same shape checks to prevent invalid data from being persisted.
- Error handling: the client shows toasts for success, network errors, and server-side errors such as validation failures or duplicate submission conflicts.

**Testing and manual verification**

- Manual test sequence: open the client in a fresh browser, fill out required fields, and submit. Confirm the server receives the request and the client stores `form_submitted` in localStorage. Reopen the page to confirm the UI prevents another submission and displays the stored email/time. Attempt submitting again using another browser or clearing localStorage to test server-side uniqueness and 409 behavior.

**Troubleshooting**

- If the client cannot POST to the server, confirm the server is running and the port matches the URL used by the client. Check browser console for CORS or network errors.
- If the server fails to connect to MongoDB, ensure `MONGODB_URI` (or local MongoDB) is available and accessible. Check server logs for connection errors.

**Development notes and suggestions**

- Consider moving the API base URL into environment configuration for the client (for example, an environment variable used at build time) rather than hard-coding `http://localhost:5010/submit` so the app is easier to run in different environments.
- For a production-style deployment, do not rely on localStorage for single-submit enforcement. Use server-side authentication or persistent identifiers to enforce per-user submission limits.
- Add tests for the server endpoints and database behavior (basic integration tests that verify 200 on success and 409 on duplicate email) to make the behavior explicit and prevent regressions.

**Contributing**

- The repo is organized as a small demo; if you plan to extend it, follow the existing component patterns in `client/src/components` and place server route logic in `server/controllers` with models in `server/models`.
