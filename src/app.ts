import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import errorHandler from './helpers/errorHandler';
import { errors } from 'celebrate';
import userRouter from './routes/user';
import productRouter from './routes/product';
import orderRouter from './routes/order';

const app = express();
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.use(errors());
app.use(errorHandler);

export default app;
