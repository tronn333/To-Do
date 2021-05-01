
const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const Game = require('./models/game.model');
const userRouter = require('./routes/userRouter')

const app = express();


app.use(logger('dev'))
app.use(express.json())
app.use(cors())
app.get('/game', async (req, res) => {
  const allGames = await Game.find();
  res.json(allGames).status(200);
});
app.use('/', userRouter)

const dbPath = 'mongodb://localhost:27017/mygame';
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

app.listen(3001, () => {
  console.log('Server start');
  mongoose.connect(dbPath, dbOptions, () => {
    console.log('Database start');
  });
});
