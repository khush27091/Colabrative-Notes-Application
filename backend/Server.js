// backend/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',  // Frontend URL
    methods: ['GET', 'POST'],
  },
});

let notes = {}; // Store notes { noteId: { content, usersEditing: [] }}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join a specific note room
  socket.on('joinNote', (noteId) => {
    socket.join(noteId);
    if (!notes[noteId]) {
      notes[noteId] = { content: '', usersEditing: [] };
    }
    io.to(noteId).emit('loadNote', notes[noteId]);
  });

  // Handle note changes
  socket.on('editNote', ({ noteId, content }) => {
    notes[noteId].content = content;
    socket.to(noteId).emit('noteUpdated', content);
  });

  // Track users currently editing a note
  socket.on('startEditing', ({ noteId, user }) => {
    notes[noteId].usersEditing.push(user);
    io.to(noteId).emit('usersEditing', notes[noteId].usersEditing);
  });

  socket.on('stopEditing', ({ noteId, user }) => {
    notes[noteId].usersEditing = notes[noteId].usersEditing.filter(
      (username) => username !== user
    );
    io.to(noteId).emit('usersEditing', notes[noteId].usersEditing);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
