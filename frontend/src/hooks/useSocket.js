// ============================================
// useSocket Hook — Socket.io Connection Manager
// ============================================
// Manages the Socket.io connection lifecycle.
// Connects when the user is authenticated, disconnects on logout.
// Listens for real-time task events and forwards them to TaskContext.

import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';

const useSocket = () => {
  const { token, isAuthenticated } = useAuth();
  const { handleSocketEvent } = useTasks();
  const socketRef = useRef(null);

  useEffect(() => {
    // Only connect if authenticated
    if (!isAuthenticated || !token) {
      return;
    }

    // Create socket connection with auth token
    const socket = io(window.location.origin, {
      auth: { token },
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;

    // Connection event handlers
    socket.on('connect', () => {
      console.log('🔌 Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('🔌 Socket disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
    });

    // Listen for task events
    socket.on('task:created', (data) => handleSocketEvent('task:created', data));
    socket.on('task:updated', (data) => handleSocketEvent('task:updated', data));
    socket.on('task:deleted', (data) => handleSocketEvent('task:deleted', data));

    // Cleanup on unmount or auth change
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isAuthenticated, token, handleSocketEvent]);

  return socketRef.current;
};

export default useSocket;
