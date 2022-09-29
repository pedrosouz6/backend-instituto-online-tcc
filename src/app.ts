import express, { Response } from 'express';
import cors from 'cors';

import { userRoutes } from './routes/User';
import { tokenRoute } from './routes/Token';
import { FieldPacket, RowDataPacket } from 'mysql2';
import { connect } from './services/connection';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', tokenRoute);

app.get('/test/:limit/:pageNumber', async (req, res): Promise<Response> => {
        const { limit, pageNumber } = req.params;
        
        const start = ( Number(limit) * Number(pageNumber) ) - Number(limit);
        const sql = `SELECT * FROM users ORDER BY id ASC LIMIT ${start}, ${limit}`;
        const sqlPagination = "SELECT id FROM users";

        try {
            const [ resultsPagination ]: [RowDataPacket[], FieldPacket[]] = await connect.promise().query(sqlPagination);
            const [ results ] = await connect.promise().query(sql);

            const totalUsers = resultsPagination.length;
            const totalPages = Math.ceil(totalUsers / Number(limit));

            return res.status(200).json({
                error: false,
                totalUsers,
                totalPages,
                results
            });
            
        } catch(err) {
            return res.status(406).json({
                error: true,
                message: "Erro ao pegar os usuário do banco de dados"
            });
        }
})

export { app };