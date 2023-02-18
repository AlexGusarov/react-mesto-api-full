require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');
const { auth } = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errorsHandler');

const { PORT = 3000, DB_ADDRESS } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', require('./routes/signin'));
app.use('/', require('./routes/signup'));
app.use('/', auth, require('./routes/cards'));
app.use('/', auth, require('./routes/users'));

app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

mongoose.set('strictQuery', false);

async function connect() {
  try {
    await mongoose.connect(DB_ADDRESS, {
      useNewUrlParser: true,
    });
    console.log('Server connected to Mongo');

    await app.listen(PORT);
    console.log(`Server listening ${PORT}`);
  } catch (err) {
    console.log(`Произошла ошибка ${err.name} - ${err.message}`);
  }
}

connect();

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
