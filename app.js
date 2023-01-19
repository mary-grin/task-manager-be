const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const boardRoutes = require('./routes/boardRoutes');

const app = express();

mongoose.connect('mongodb+srv://hryn_mariia:mariia@cluster0.gntodkb.mongodb.net/task-manager?retryWrites=true&w=majority')
.then(() => console.log('Connect to DB'))
.catch((e) => console.log('Not connect to DB'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: [ 'http://localhost:4200' ] }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/board', boardRoutes);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : "Unauthorized"});
    }
  });

module.exports = app;