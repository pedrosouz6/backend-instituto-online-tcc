import express from 'express';
import cors from 'cors';

import { userRoutes } from './routes/User';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

export { app };