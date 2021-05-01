const mongoose = require('mongoose');
const Game = require('./models/game.model');
const dbPath = 'mongodb://localhost:27017/mygame';
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

async function createGames() {
  await Game.create([
    {
      name: 'Кто убил К...',
      questions: [
        {
          question: 'Кто убил Кеннеди?',
          answer: 'хз',
          points: 200
        },
        {
          question: 'Кто убил Кенни?',
          answer: 'смотря в какой серии',
          points: 300
        },
        {
          question: 'Кто убил Кролика Роджера?',
          answer: 'никто',
          points: 400
        }
      ]
    },
    {
      name: 'React',
      questions: [
        {
          question: 'Кто придумал React?',
          answer: 'хз',
          points: 200
        },
        {
          question: 'Кто придумал React?',
          answer: 'хз',
          points: 300
        },
        {
          question: 'Кто придумал React?',
          answer: 'хз',
          points: 400
        }
      ]
    },
    {
      name: 'blabla',
      questions: [
        {
          question: 'Bla?',
          answer: 'bla',
          points: 200
        },
        {
          question: 'Blabla?',
          answer: 'blabla',
          points: 300
        },
        {
          question: 'Blablabla?',
          answer: 'blablabla',
          points: 400
        }
      ]
    }
  ])
}

createGames()

mongoose.connect(dbPath, dbOptions, () => {
  console.log('Database start');
});
