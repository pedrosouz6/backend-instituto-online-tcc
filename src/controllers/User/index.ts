import { Request, Response } from "express";
import { FieldPacket, ResultSetHeader } from "mysql2";

import { connect } from '../../services/connection';

export class ControllerUser {
    async createUser(req: Request, res: Response): Promise<Response> {
        const { name, email, password, date, cpf, tel } = req.body;

        const sql = "INSERT INTO users (name, email, password, date, cpf, telephone) VALUES(?, ?, ?, ?, ?, ?)";
        const values: Array<string> = [ name, email, password, date, cpf, tel ];

        try {
            const [results]: [ResultSetHeader, FieldPacket[]] = await connect.promise().query(sql, values);

            if(results) {
                return res.status(201).json({
                    error: false,
                    message: "O usuário foi cadastrado com sucesso.",
                    user: {
                        name
                    }
                });
            }

        } catch (err) {
            return res.status(409).json({
                error: true,
                message: "Erro ao cadastrar o usuário."
            })
        }
    }

    async getUsers(req: Request, res: Response): Promise<Response> {
        const sql = "SELECT * FROM users";

        try {
            const [results] = await connect.promise().query(sql);

            return res.status(200).json({
                error: false,
                results
            });
            
        } catch(err) {
            return res.status(406).json({
                error: true,
                message: "Erro ao pegar os usuário do banco de dados"
            });
        }

    }
}