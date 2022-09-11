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
}