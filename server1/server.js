const express = require('express');
var bodyParser = require('body-parser');
const app = require('express')();
const http = require('http');
const passport = require('passport')
const session = require('express-session')

var cors = require('cors');
const APIRouter = require('./api/api.router');
const { SESSION_SECRET, CLIENT_ORIGIN } = require('./config/config');
const streamer = require('./lib/Events/streamer');

const passportInit = require('./Auth/passport.init')
const authRouter = require('./Auth/auth.router')

let server = http.createServer(app);
app.use(passport.initialize());
passportInit();

app.get('/', (req, res) => {
    res.send('👍');
});

//const io = require('socket.io')(server);

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

app.use(cors({
    origin: CLIENT_ORIGIN
  }));

  app.use(session({ 
    secret: SESSION_SECRET, 
    resave: true, 
    saveUninitialized: true
  })) 
  app.set('io', io);
/*io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });*/
  io.on('connection', (socket) => {
    //io.emit('chat message', socket.id +'is connected');
    
    socket.on('disconnect', () => {
       io.emit('chat message', socket.id+ 'is disconnected');
    });

    socket.on('chat message', (data) => {
         console.log(data);
         io.emit('chat message', data);
        streamer.emit('create.message',data);
  });
});
  app.use('/api', APIRouter);
  app.use('/', authRouter);
  app.use(express.json());
  //app.use(bodyParser.urlencoded({ extended: true })); 
  server.listen(8080, () => {
    console.log('listening on *:8080');
  }); 