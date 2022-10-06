import { createConnection } from 'mysql2';

require('dotenv').config({  
    path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development"
})

export const connect = createConnection({  
    database: process.env.DATABASE,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    user: process.env.USER,
    port: Number(process.env.PORT_DB),
});