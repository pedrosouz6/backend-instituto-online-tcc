import { Request, Response } from "express";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import jwt from 'jsonwebtoken';
import { config } from "../../services/jwt";

import { connect } from '../../services/connection';

interface Docs {
    id: number,
    name: string,
    email: string,
    password: string,
    telephone: string,
    cpf: string,
    date: Date,
    office: string
}

export class ControllerDocs {
    async getDocs(req: Request, res: Response): Promise<Response> {
        const { limit, pageNumber, filterUser } = req.params;

        let searchName: string;

        if(filterUser === 'null') {
            searchName = '';
        } else {
            searchName = filterUser;
        }
        
        const start = ( Number(limit) * Number(pageNumber) ) - Number(limit);
        const sql = `SELECT * FROM users WHERE name LIKE '%${searchName}%' && office = 'Balé' || office = 'Creches comunitárias' || office = 'Horta' || office = 'Judô'
        ORDER BY id ASC LIMIT ${start}, ${limit}`;
        const sqlPagination = "SELECT id FROM users WHERE office = 'Balé' || office = 'Creches comunitárias' || office = 'Horta' || office = 'Judô'";

        try {
            const [ resultsPagination ]: [RowDataPacket[], FieldPacket[]] = await connect.promise().query(sqlPagination);
            const [ results ] = await connect.promise().query(sql);

            const totalUsers = resultsPagination.length;
            const totalPages = Math.ceil(totalUsers / Number(limit));

            return res.status(200).json({
                message: 'Usuários obtdos com sucesso',
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
    }

    async deleteDocs(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const sql = "DELETE FROM docs WHERE id = ?";
        const values = [id];

        try {
            const [ results ] = await connect.promise().query(sql, values);

            return res.status(200).json({
                error: false,
                message: "Usuário deletado com sucesso"
            })
        } catch(err) {
            return res.status(401).json({
                error: true,
                message: "Não foi possível deletar usuário"
            })
        }
    }   

    async getOneDocs(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const sql = "SELECT * FROM docs WHERE id = ?";
        const values = [ id ];

        try {
            const [ results ] = await connect.promise().query(sql, values);

            return res.status(200).json({
                error: false,
                results
            })

        } catch(err) {
            return res.status(404).json({
                error: true,
                message: "Não foi possível pegar os dados do usuário"
            })
        }
    }
    
    async updateDocs(req: Request, res: Response) {
        const { id, name, email, password, date, cpf, tel, project } = req.body;

        const sql = "UPDATE docs SET name = ?, email = ?, password = ?, date = ?, cpf = ?, telephone = ?, office = ? WHERE id = ?";
        const values: Array<string> = [ name, email, password, date, cpf, tel, project, id ];

        try {
            const [ results ]: [ResultSetHeader, FieldPacket[]] = await connect.promise().query(sql, values);

            if(results) {
                return res.status(201).json({
                    error: false,
                    message: "O usuário foi atualizado com sucesso."
                });
            }

        } catch (err) {
            return res.status(409).json({
                error: true,
                message: "Erro ao atualizar o usuário."
            })
        }
    }
}