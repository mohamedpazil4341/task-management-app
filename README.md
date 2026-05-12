# TaskFlow — Full-Stack Task Management Application

A modern, production-ready task management web application built with React, Node.js, Express, MongoDB, and Socket.io.

## Features

- **Authentication**: JWT-based register/login with bcrypt password hashing
- **Task CRUD**: Create, read, update, delete tasks with validation
- **Dashboard**: Statistics cards, search, filter by status/priority, sort, pagination
- **Real-time Updates**: Socket.io for instant task synchronization
- **Dark/Light Mode**: System-aware theme toggle with persistence
- **Responsive Design**: Mobile, tablet, and desktop layouts
- **Premium UI**: Glassmorphism, gradient backgrounds, Framer Motion animations

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS 3, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Auth | JWT + bcrypt |
| Real-time | Socket.io |
| Icons | Lucide React |

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier works)

### 1. Clone & Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Setup

```bash
# Copy the example env file
cd backend
cp .env.example .env
```

Edit `backend/.env` with your values:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASS@cluster0.xxxxx.mongodb.net/taskflow
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:5173
```

### 3. Seed Sample Data (Optional)

```bash
cd backend
npm run seed
# Creates demo user: demo@taskflow.com / demo123
```

### 4. Run Development Servers

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

Open **http://localhost:5173** in your browser.

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register user |
| POST | /api/auth/login | No | Login user |
| GET | /api/auth/profile | Yes | Get profile |
| PUT | /api/auth/profile | Yes | Update profile |
| GET | /api/tasks | Yes | List tasks |
| GET | /api/tasks/stats | Yes | Task statistics |
| GET | /api/tasks/:id | Yes | Get single task |
| POST | /api/tasks | Yes | Create task |
| PUT | /api/tasks/:id | Yes | Update task |
| DELETE | /api/tasks/:id | Yes | Delete task |

## Deploy to Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Settings:
   - **Build Command**: `cd frontend && npm install && npm run build && cd ../backend && npm install`
   - **Start Command**: `cd backend && node server.js`
5. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`
6. Deploy!

## Project Structure

```
├── backend/
│   ├── config/db.js          # MongoDB connection
│   ├── controllers/          # Route handlers
│   ├── middleware/            # Auth, error, validation
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API routes
│   ├── socket/               # Socket.io handlers
│   ├── seed/                 # Sample data
│   └── server.js             # Entry point
├── frontend/
│   └── src/
│       ├── components/       # UI, layout, auth, task components
│       ├── context/          # Auth, Task, Theme state
│       ├── hooks/            # Custom hooks
│       ├── pages/            # Page components
│       ├── services/         # API calls
│       └── utils/            # Constants & helpers
└── render.yaml               # Render deployment config
```
