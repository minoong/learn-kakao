import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import passport from 'passport';
import api from './api/index.js';

// 환경변수 로드
dotenv.config();

const { PORT, MONGO_URI } = process.env;

// db connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    dbName: 'Kakao',
  })
  .then(() => {
    console.log('connected to mongoDB.');
  })
  .catch((e) => {
    conosole.error(e);
  });

// ESM 오류 해결을 위해 __dirname, __filename 직접 변수 작성
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set('port', PORT);

app.use(morgan('dev'));
// static 경로 설정
app.use(express.static(path.join(__dirname, 'public')));
// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.KEY));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.KEY,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);

app.use('/', api);

app.get('/', (req, res, next) => {
  next();
});

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.json({ ...res.locals, ...res.status });
});

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')} 포트에서 실행 중...`);
});
