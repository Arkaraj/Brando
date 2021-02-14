const express = require('express');
const app = express()

const mongoose = require('mongoose');
require('dotenv').config();

const movies = require('./routes/movies');

mongoose.connect(`mongodb://localhost/Movie`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
    console.log('Successfully connected to Database!!');
});

app.use('/movies', movies)


const port = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Working' })
})

app.listen(port, () => {
    console.log(`Listening on port ${port} 🚀`)
})