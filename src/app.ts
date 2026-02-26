import express from 'express';
import { logger } from './middleware/logger';
import { userRouter } from '@/components/user/';

const app = express();

app.use(express.json());

app.use('/users', userRouter);

app.use(logger);

export default app;
