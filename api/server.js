const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionConfiguration = {
  name: "ohfosho", // default will be 'sid' and we do now want people to know which library we use
  secret: "keep it secret, keep it safe!", // coming from the environment - use an env varuable for this
  cookie: {
    httpOnly: true, // JS can NOT access the cookie when = true
    maxAge: 1000 * 60 * 60, // expiration time in miliseconds
    secure: false, // use cookie over HTTPS onle. should be TRUE in production - false in development
  },
  resave: false,
  saveUninitialized: true, // read about GDPR compliance
};


// Global Middleware
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(sessions(sessionConfiguration)); // turn on sessions support

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
