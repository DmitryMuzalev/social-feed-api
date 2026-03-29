import express from 'express';
import { logger } from './middleware/logger';
import { userRouter } from './components/user';
import { errorHandler, notFound } from './middleware';

const app = express();

app.use(express.json());

app.use(logger);

app.use('/users', userRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
