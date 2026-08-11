# 14 Appointments

Full-stack homework project for managing medical appointments, patients, and doctors.

## Live Links

- Frontend: https://14-appointments.vercel.app/
- Backend API: https://one4-appointments.onrender.com/

## Project Structure

```text
14-appointments/
  backend/    Express API with JSON file storage
  frontend/   React + Vite application
```

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Redux Toolkit / RTK Query
- CSS Modules

### Backend

- Node.js
- Express
- JSON file storage
- CORS

## API Routes

Base URL:

```text
https://one4-appointments.onrender.com/
```

### Patients

```text
GET    /patients
GET    /patients/:id
POST   /patients
PUT    /patients/:id
PATCH  /patients/:id
DELETE /patients/:id
GET    /patients?name=іван
```

### Appointments

```text
GET    /appointments
GET    /appointments/:id
POST   /appointments
PUT    /appointments/:id
PATCH  /appointments/:id
DELETE /appointments/:id
GET    /appointments?date=2025-08-01
GET    /appointments?patientName=іван
```

### Doctors

```text
GET    /admin/doctors
GET    /admin/doctors/:id
POST   /admin/doctors
PUT    /admin/doctors/:id
PATCH  /admin/doctors/:id
DELETE /admin/doctors/:id
```

## Local Setup

Clone the repository and install dependencies separately for the backend and frontend.

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend local URL:

```text
http://localhost:3000/
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend local URL:

```text
http://localhost:5173/
```

## Deployment

### Backend on Render

Render settings:

```text
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

### Frontend on Vercel

Vercel settings:

```text
Root Directory: frontend
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

The frontend currently uses the deployed backend URL in:

```text
frontend/src/store/api.js
```
