// frontend/src/utils/socket.ts
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export default socket;

// Add the following line to treat this file as a module:
export {};
