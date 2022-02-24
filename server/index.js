import express from 'express';
import cors from 'cors';
let app = express();
let port = process.env.PORT || 5000;
app.use(cors());

app.get('/', (req, res) => {
  console.log("New request!");
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});