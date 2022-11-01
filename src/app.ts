import express from 'express';
import cors from 'cors';

import { userRoutes } from './routes/User';
import { tokenRoute } from './routes/Token';
import { helpRouter } from './routes/Help';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', userRoutes);
app.use('/api', tokenRoute);
app.use('/api', helpRouter);

export { app };