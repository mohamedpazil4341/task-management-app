// ============================================
// Server Entry Point — Express + Socket.io
// ============================================
// This is the main file that starts the server.
// It sets up Express, connects to MongoDB, configures
// Socket.io, and mounts all routes.

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const setupSocket = require('./socket/socketHandler');

// ---- Connect to MongoDB ----
connectDB();

// ---- Create Express App ----
const app = express();

// ---- Create HTTP Server (needed for Socket.io) ----
const server = http.createServer(app);

// ---- Setup Socket.io ----
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Make io accessible in route handlers via req.app.get('io')
app.set('io', io);

// Setup socket event handlers
setupSocket(io);

// ---- Middleware ----
// Enable CORS (Cross-Origin Resource Sharing)
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// ---- API Routes ----
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// ---- Health Check Endpoint ----
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'TaskFlow API is running' });
});

// ---- Serve Frontend in Production ----
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React build folder
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // For any route not matching an API route, serve the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// ---- Error Handling ----
app.use(notFound);
app.use(errorHandler);

// ---- Start Server ----
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
