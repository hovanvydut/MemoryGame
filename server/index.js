require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

// connect DB
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@cluster0-zld6m.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected DB sucessfully');
});

const app = express();
const server = http.Server(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/static', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// Router
app.use('/api/v1', require('./app/router/api/v1/index'));

app.get('/', (req, res) => {
  return res.send('https://github.com/hovanvydut/MemoryGame');
});

server.listen(PORT, () => console.log(`App has started on port ${PORT}`));

// Handle realtime
let dataOfCard = [
  {
    id: 1,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png',
    match: 19,
  },
  {
    id: 2,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/002.png',
    match: 20,
  },
  {
    id: 3,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/003.png',
    match: 21,
  },
  {
    id: 4,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png',
    match: 22,
  },
  {
    id: 5,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png',
    match: 23,
  },
  {
    id: 6,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png',
    match: 24,
  },
  {
    id: 7,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png',
    match: 25,
  },
  {
    id: 8,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/008.png',
    match: 26,
  },
  {
    id: 9,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png',
    match: 27,
  },
  {
    id: 10,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/010.png',
    match: 28,
  },
  {
    id: 11,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/011.png',
    match: 29,
  },
  {
    id: 12,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/012.png',
    match: 30,
  },
  {
    id: 13,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/013.png',
    match: 31,
  },
  {
    id: 14,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/014.png',
    match: 32,
  },
  {
    id: 15,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/015.png',
    match: 33,
  },
  {
    id: 16,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/016.png',
    match: 34,
  },
  {
    id: 17,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/017.png',
    match: 35,
  },
  {
    id: 18,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/018.png',
    match: 36,
  },
  {
    id: 19,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png',
    match: 1,
  },
  {
    id: 20,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/002.png',
    match: 2,
  },
  {
    id: 21,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/003.png',
    match: 3,
  },
  {
    id: 22,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png',
    match: 4,
  },
  {
    id: 23,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png',
    match: 5,
  },
  {
    id: 24,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png',
    match: 6,
  },
  {
    id: 25,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png',
    match: 7,
  },
  {
    id: 26,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/008.png',
    match: 8,
  },
  {
    id: 27,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png',
    match: 9,
  },
  {
    id: 28,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/010.png',
    match: 10,
  },
  {
    id: 29,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/011.png',
    match: 11,
  },
  {
    id: 30,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/012.png',
    match: 12,
  },
  {
    id: 31,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/013.png',
    match: 13,
  },
  {
    id: 32,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/014.png',
    match: 14,
  },
  {
    id: 33,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/015.png',
    match: 15,
  },
  {
    id: 34,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/016.png',
    match: 16,
  },
  {
    id: 35,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/017.png',
    match: 17,
  },
  {
    id: 36,
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/018.png',
    match: 18,
  },
];

io.on('connection', (socket) => {
  io.sockets.emit('online-user-count', io.eio.clientsCount);
  console.log(io);
  socket.on('disconnect', () => {
    io.sockets.emit('online-user-count', io.eio.clientsCount);
  });
});

function getListRoom(memoryGameNsp) {
  return Object.keys(memoryGameNsp.adapter.rooms).filter((elm) =>
    elm.match(/^[^\\/memorygame#].*/)
  );
}

const memoryGameNsp = io.of('/memorygame');
memoryGameNsp.on('connection', (socket) => {
  memoryGameNsp.emit('list-room', getListRoom(memoryGameNsp));
  socket.on('create-room-memorygame', async ({ roomName, userInfo }, cb) => {
    const existRoom = memoryGameNsp.adapter.rooms[roomName];
    if (existRoom) {
      return cb({ message: 'Room exist' });
    }
    socket.join(roomName);
    memoryGameNsp.adapter.rooms[roomName].player1 = userInfo;
    memoryGameNsp.emit('list-room', getListRoom(memoryGameNsp));
    return cb(null);
  });

  // join room
  socket.on('join-room-memorygame', async ({ currentRoom, userInfo }, cb) => {
    const existRoom = memoryGameNsp.adapter.rooms[currentRoom];
    if (!existRoom) {
      socket.join(currentRoom);
      memoryGameNsp.adapter.rooms[currentRoom].player1 = userInfo;
      // console.log(memoryGameNsp);

      return memoryGameNsp.emit('list-room', getListRoom(memoryGameNsp));
    }
    if (memoryGameNsp.adapter.rooms[currentRoom].length === 1) {
      socket.join(currentRoom);
      socket.emit('set-turn', 2);
      socket.broadcast
        .to(currentRoom)
        .emit('get-info-other-player', { userInfo });
      socket.emit('get-info-other-player', {
        userInfo: memoryGameNsp.adapter.rooms[currentRoom].player1,
      });
      dataOfCard.forEach((card) => {
        card.order = Math.random();
      });
      dataOfCard = dataOfCard.sort((a, b) => a.order - b.order);
      memoryGameNsp.in(currentRoom).emit('get-data-of-cards', { dataOfCard });
    } else {
      return cb({ message: 'room full' });
    }
  });

  // boardgame
  socket.on('select-first-card', (cardId, currentRoom) => {
    socket.broadcast
      .to(currentRoom)
      .emit('response-select-first-card-to-other-user', cardId);
  });
  socket.on('select-second-card', (cardId, currentRoom) => {
    socket.broadcast
      .to(currentRoom)
      .emit('response-select-second-card-to-other-user', cardId);
  });
  socket.on('add-card-into-selected', (cardId1, cardId2, currentRoom) => {
    socket.broadcast
      .to(currentRoom)
      .emit('response-add-card-into-selected', cardId1, cardId2);
  });
  socket.on('plus-score', (point, currentRoom) => {
    socket.broadcast.to(currentRoom).emit('response-plus-score', point);
  });
  socket.on('change-turn', (currentRoom) => {
    socket.broadcast.to(currentRoom).emit('response-change-turn');
  });
  memoryGameNsp.emit('list-room', getListRoom(memoryGameNsp));
  socket.on('leave-memoryGame', (currentRoom) => {
    socket.leave(currentRoom);
    socket.to(currentRoom).emit('response-leave-room');
  });
  socket.on('win', async (userInfo, currentRoom) => {
    memoryGameNsp.to(currentRoom).emit('response-win', userInfo);
  });
});
