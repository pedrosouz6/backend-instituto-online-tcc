import { createConnection } from 'mysql2';
import 'dotenv/config';

export const connect = createConnection({  
    database: process.env.DATABASE,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    user: process.env.USER,
    port: Number(process.env.PORT_DB),
});