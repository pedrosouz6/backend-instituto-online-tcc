import express, { Response, urlencoded } from 'express';
import cors from 'cors';

import { userRoutes } from './routes/User';
import { tokenRoute } from './routes/Token';
import { FieldPacket, RowDataPacket } from 'mysql2';
import { connect } from './services/connection';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', userRoutes);
app.use('/api', tokenRoute);

export { app };