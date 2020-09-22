require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');

app.use(cors());
app.use(bodyParser.json());

app.use((error, req, res, next) => {
  const { statusCode = 500, message, data = [] } = error
  console.log('this was the error and yes we got it, ', error)
  res.status(statusCode).json({ message, data })
});

app.use(postRoutes);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected');
    app.listen(8080);
  })
  .catch(error => console.log(`error connecting, ${error}`));