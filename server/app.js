require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')

const port = 3000

const url  = 'mongodb://localhost/from-nasa-with-love'

const indexRoutes = require('./routes');

mongoose.connect(url, {useNewUrlParser: true});

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', indexRoutes);


app.listen(port, ()=> {
  console.log(`listening on port : ${port}`)
})