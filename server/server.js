const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { default: mongoose } = require('mongoose');
const socket = require('socket.io');
require('dotenv').config();

const app = express();
const port = process.env.port;

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

app.use('/api', require('./routes/authRoute'));
app.use('/api/message', require('./routes/messageRoute'));

mongoose
  .connect(process.env.MongoURL)
  .then(() => {
    console.log('Database Connected');
  })
  .catch((error) => {
    console.log(error);
  });

const server = app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

const io = socket(server, {
  cors: {
    origin: 'http://127.0.0.1:5173/',
    Credentials: true,
  },
});

global.onlineUsers = new Map();
io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-receive', data.message);
    }
  });
});
