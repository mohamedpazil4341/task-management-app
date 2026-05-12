// ============================================
// Socket.io Handler — Real-Time Communication
// ============================================
// Handles WebSocket connections for real-time task updates.
// Each authenticated user joins their own "room" so they
// only receive updates for their own tasks.

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const setupSocket = (io) => {
  // ---- Socket Authentication Middleware ----
  // Verify JWT token before allowing socket connection
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Authentication error: No token'));
      }

      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return next(new Error('Authentication error: User not found'));
      }

      // Attach user info to the socket
      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  // ---- Handle New Connections ----
  io.on('connection', (socket) => {
    console.log(`🔌 User connected: ${socket.user.name} (${socket.user._id})`);

    // Join the user's personal room (so they only get their own updates)
    socket.join(socket.user._id.toString());

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`🔌 User disconnected: ${socket.user.name}`);
    });
  });
};

module.exports = setupSocket;
