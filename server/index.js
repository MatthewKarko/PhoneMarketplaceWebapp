// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import cors from 'cors';

// https://stackoverflow.com/questions/19035373/how-do-i-redirect-in-expressjs-while-passing-some-context
const express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

const phoneRouter = require('./routes/phone.routes.js');
const userRouter = require('./routes/user.routes.js');


const app = express();


app.use('/phone', phoneRouter);
app.use('/user', userRouter);


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.set('views', path.join(__dirname,'../client'));

app.use(express.static(path.join(__dirname, '../client/build')));


app.get('/', function (req, res) {
  req.session.valid = true;
  res.redirect('/homepage');
});

const CONNECTION_URL = 'mongodb://localhost/Assignment2';
const PORT = process.env.PORT || 3000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
