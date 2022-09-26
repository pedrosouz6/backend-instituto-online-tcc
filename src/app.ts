import express from 'express';
import cors from 'cors';

import { userRoutes } from './routes/User';
import { tokenRoute } from './routes/Token';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', tokenRoute);

export { app };