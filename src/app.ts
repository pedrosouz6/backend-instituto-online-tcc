import express, { Request, Response } from 'express';
import cors from 'cors';

import { userRoutes } from './routes/User';
import { tokenRoute } from './routes/Token';
import { configCrypto } from './instance/Crypto';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', userRoutes);
app.use('/api', tokenRoute);

app.get('/test', (req: Request, res: Response) => {
    // const password = configCrypto.crypt('pedro');
    const pass = configCrypto.decrypt('6243e3d6380cb90f26f83929f546ef8a:3d031301f66717331435f639f20492d8');
    res.send(pass);
})

export { app };