import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import config from '../src/config';
import passport from 'passport';
import * as actions from './actions/index';
import player from './actions/player';
import Mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import {mapUrl} from 'utils/url.js';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';

const pretty = new PrettyError();
const MongoStore = connectMongo(session);

const app = express();

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

// Init sessions and auth
app.use(session({
  secret: '<shhhitsasecret>',
  saveUninitialized: true,
  resave: true,
  cookie: {
    secure: false,
    maxAge: 60000
  },
  store: new MongoStore({ url: 'mongodb://localhost/vinylwax' })
}));

// app.use(session({
//   secret: 'AudioPlayer POC',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { maxAge: 60000 }
// }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Database Configuration
const connect = () => {
  console.log('Mongoose#connect, connecting to dev db');
  Mongoose.connect(
    'mongodb://localhost/vinylwax',
    {
      db: {
        safe: true
      }
    }
  );
};

connect();

Mongoose.connection.on('error', console.log);
Mongoose.connection.on('disconnected', connect);

app.post('/player', (req, res) => {
  console.log('Working!!!');
})
app.use((req, res) => {
  // console.log('req:', req);
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  console.log('splittedUrlPath: ', splittedUrlPath);
  const {action, params} = mapUrl(actions, splittedUrlPath);
  console.log('action: ', action);
  if (action) {
    action(req, params)
      .then((result) => {
        console.log('result ::', result);
        if (result instanceof Function) {
          result(res);
        } else {
          // console.log('results json::', JSON.parse(result));
          res.json(result);
        }
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }
});


const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
  });

  io.on('connection', (socket) => {
    socket.emit('news', {msg: `'Hello World!' from server`});

    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });

    socket.on('msg', (data) => {
      data.id = messageIndex;
      messageBuffer[messageIndex % bufferSize] = data;
      messageIndex++;
      io.emit('msg', data);
    });
  });
  io.listen(runnable);
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
