const express = require('express');
const app = express();

const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

const auth = require('./routes/auth');

// mongodb://localhost/Movie
mongoose.connect(
  `${process.env.URI}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("Environment variables: ", process.env);
    console.log('Successfully connected to Database!!');
  }
);
if (process.env.NODE_ENV == 'development') {
  mongoose.set('debug', true);
}

app.use(
  cors({
    origin: [`${process.env.FRONT_END_URL}`], // add front end link
    methods: ['POST', 'GET', 'DELETE', 'PUT', 'PATCH'],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/user', auth);

const port = process.env.PORT || 8080;

// if (process.env.NODE_ENV == 'production') {
//   app.use(express.static(path.join(__dirname, '/client/build')));

//   app.get('*', (_, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
//   });
// } else {
//   app.get('/', (_, res) => {
//     res.status(200).json({ msg: 'API Working' });
//   });
// }
app.get('/', (_, res) => {
  res.status(200).json({ msg: 'API Working' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port} 🚀`);
});
