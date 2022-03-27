import express from 'express';

import bookRoutes from './routes/Book.js'

import cors from 'cors';
const app = express();
let port = process.env.PORT || 5000;
app.use(cors());

app.get('/', (req, res) => {
  console.log("New request");
  res.send("Hello, world!");
});

app.use('/books', bookRoutes);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
