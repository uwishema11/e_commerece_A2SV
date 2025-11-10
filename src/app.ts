import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import { errors } from 'celebrate';
import userRouter from './routes/user';
import productRouter from './routes/product';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use(errors());

export default app;
