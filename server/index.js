import express from 'express';

import api from './routes/api.js'
// import joinRoute from './routes/Join.js'

import cors from 'cors';
const app = express();
let port = process.env.PORT || 5000;
app.use(cors());

app.get('/', (req, res) => {
  console.log("New request");
  res.send("Hello, world!");
});

app.use('/api', api);
// app.use('/books/:order?', bookRoutes);
// app.use('/join', joinRoute);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
