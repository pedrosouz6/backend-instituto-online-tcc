import express from 'express';

import { userRoutes } from './routes/User';

const app = express();

app.use(express.json());
app.use('/api', userRoutes);

export { app };