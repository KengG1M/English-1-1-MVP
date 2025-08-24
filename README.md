# English 1-1 MVP (React + NestJS + Prisma + JWT)

An MVP for a 1-on-1 English learning platform: browse teachers → view available time slots → book a **25’ free trial lesson** → (buy packages later).
Frontend: **React + Vite + Tailwind (dark glass UI)**.
Backend: **NestJS + Prisma + PostgreSQL + JWT**.

---

## ✨ Current Features (MVP)

**Student**

* Browse teacher list (name, skills, rating, rate/25’).
* Teacher detail page with weekly availability.
* Book a **25’ trial lesson** (JWT required).
* **Login / Register** (styled UI) + token storage.
* **Dashboard** (glassmorphism) shows upcoming lessons (mock if API not implemented).

**Other**

* CORS enabled (FE 5173 ↔ BE 3000).
* Seed demo: 3 teachers + 7-day slots (12:00/19:00/21:00 VN time) + 3 packages.
* Demo student: `demo@student.local / 123456`.

---

## 🗂️ Project Structure

```
.
├─ client/                  # React + Vite + Tailwind
│  ├─ src/
│  │  ├─ pages/             # Home, Teachers, TeacherDetail, TrialCheckout, Login, Register, Dashboard
│  │  ├─ components/        # AuthLayout, Modal, Section, BookingCard, Field, ...
│  │  └─ lib/               # api.ts (axios + interceptors), auth.ts (token helpers)
│  └─ .env.example
└─ server/                  # NestJS + Prisma
   ├─ prisma/
   │  ├─ schema.prisma      # Models: User, TeacherProfile, AvailabilitySlot, Booking, Package, ...
   │  └─ seed.ts            # Seed demo data
   ├─ src/
   │  ├─ auth/              # /auth/register, /auth/login, /auth/me (JWT)
   │  ├─ teachers/          # /teachers, /teachers/:id, /teachers/:id/availability
   │  ├─ bookings/          # /bookings/trial (JWT guard)
   │  ├─ packages/          # /packages, /checkout/package (mock)
   │  ├─ reviews/           # /reviews
   │  ├─ prisma/prisma.service.ts
   │  ├─ app.module.ts
   │  └─ main.ts            # ValidationPipe + CORS + port 3000
   └─ .env.example
```

---

## ⚙️ Setup & Run

### 0) Requirements

* Node 18+
* PostgreSQL (Neon or local). If using Neon, enable `sslmode=require`.

### 1) Backend

```bash
cd server
cp .env.example .env
# edit DATABASE_URL, JWT_SECRET if needed
npm install
npm run prisma:migrate
npm run prisma:seed
npm run start:dev   # http://localhost:3000
```

**Example `server/.env`:**

```env
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
JWT_SECRET="dev_secret_change_me"
JWT_EXPIRES="7d"
```

### 2) Frontend

```bash
cd client
cp .env.example .env   # VITE_API_URL=http://localhost:3000
npm install
npm run dev            # http://localhost:5173
```

**Example `client/.env`:**

```env
VITE_API_URL=http://localhost:3000
```

---

## 🔐 Authentication (JWT)

**Register**

```
POST /auth/register
{ "email": "you@example.com", "password": "123456", "name": "You" }
→ { accessToken, user }
```

**Login**

```
POST /auth/login
{ "email": "demo@student.local", "password": "123456" }
→ { accessToken, user }
```

**Get current user**

```
GET /auth/me
Authorization: Bearer <token>
```

Frontend stores token in `localStorage`. Axios interceptor attaches token to every request; if 401 → popup/lock screen appears.

---

## 🧪 Demo Flow

1. Go to **/register** or login with demo user: `demo@student.local / 123456`.
2. Go to **/teachers** → pick a teacher → select a slot.
3. **/checkout/trial** → confirm (JWT protected) → see it in **/dashboard**.

   * If backend doesn’t implement `GET /bookings/my`, Dashboard shows mock data.

---

## 🧵 Main API (server)

* `GET /teachers`
  Query: `skills`, `minRate`, `maxRate` (optional)

* `GET /teachers/:id`

* `GET /teachers/:id/availability?weekStart=YYYY-MM-DD`
  Returns 7-day slots from `weekStart` (or current week).

* `POST /bookings/trial` *(JWT required)*
  Body:

  ```json
  { "teacherId": "string", "startUtc": "ISO", "minutes": 25 }
  ```

* `GET /packages`

* `POST /checkout/package` *(mock payment)*

* `POST /reviews`

👉 Suggested for Dashboard:

* `GET /bookings/my?range=upcoming|past` *(JWT required)*

---

## 🧰 Seed Data

* 3 teachers (`Emma`, `John`, `Alice`) + profiles.
* Slots for 7 upcoming days: 12:00 / 19:00 / 21:00 VN time → UTC.
* Demo student:

  * email: `demo@student.local`
  * password: `123456`
* 3 packages (Starter, Focus, Deep).

Run seed:

```bash
cd server
npm run prisma:seed
```

---

## 🧩 UI/UX Highlights

* **Dark glass theme** (gradients + noise, no-repeat fix).
* **Login/Register**: modern card with password toggle, error states.
* **Dashboard**: hero welcome card, booking cards, quick actions.
* **Auth guard**:

  * Clicking “Dashboard” when not logged in → popup with login/register prompt.
  * Visiting `/dashboard` directly when not logged in → lock screen.

---

## 📦 Useful Scripts

**Server**

```bash
npm run prisma:migrate   # migrate schema
npm run prisma:seed      # seed demo data
npm run start:dev        # NestJS dev server
```

**Client**

```bash
npm run dev              # Vite dev server
npm run build            # production build
npm run preview          # preview build
```

---

## 🗺️ Next Steps

* Implement `GET /bookings/my` for real dashboard data.
* Teacher availability management UI.
* Auth improvements: refresh tokens, social login.
* Real payments (Stripe / Momo / ZaloPay).
* Email/SMS reminders.
* Admin console for CRUD on teachers/slots/packages.


