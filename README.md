# English 1‑1 MVP (React + NestJS + Prisma)

This is a minimal, week‑one MVP skeleton for a 1‑1 English tutoring platform.

## Quick Start

### 1) Database
- Use a PostgreSQL DB (e.g., Neon). Grab the connection string.
- Copy `server/.env.example` to `server/.env` and set `DATABASE_URL`.

### 2) Server (NestJS + Prisma)
```bash
cd server
npm install
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```
The server starts at `http://localhost:3000` with CORS enabled.

### 3) Client (React + Vite + Tailwind)
```bash
cd client
cp .env    # ensure VITE_API_URL points to your server
npm install
npm run dev
```

### 4) Test flow
- Visit the client (default Vite port 5173).
- Go to **Teachers**, open a teacher, pick any available slot, click **Đặt học thử**.
- Confirm. You should land on **Dashboard**. (Server stores booking.)

> Authentication is stubbed in week 1. Bookings use a demo student ID if no auth.
> Payments are mocked for demo.

---

## API Summary
- `GET /teachers` — list/filter teachers
- `GET /teachers/:id` — teacher detail
- `GET /teachers/:id/availability?weekStart=YYYY-MM-DD` — weekly availability
- `POST /bookings/trial` — book a 25' trial
- `GET /packages` — list packages
- `POST /checkout/package` — mock checkout

See code for more details.
