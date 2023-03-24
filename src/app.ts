const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
export const app = express();
const route = require('./routes/routes');
app.use(cors({ origin: '*' }));
app.use(route);

export const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }) => {
        socket.join(room);
        console.log(`user ${name} is connected to room #${room}`);
    });

    io.on('disconnect', () => {
        console.log('Disconnect');
    });
});
