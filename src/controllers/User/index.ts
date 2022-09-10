import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";

import { connect } from '../../services/connection';

export class ControllerUser {
    createUser(req: Request, res: Response) {
        const { name, email, password, date, cpf, tel } = req.body;

        const sql = "INSERT INTO users (name, email, password, date, cpf, telephone) VALUES(?, ?, ?, ?, ?, ?)";
        const values: Array<string> = [ name, email, password, date, cpf, tel ];

        connect.query(sql, values, (error, results: RowDataPacket[]) => {
            if(results) {
                return res.status(201).json(results);
            }

            return res.send("Erro ao cadastrar um novo usuário");
        })
    }
}