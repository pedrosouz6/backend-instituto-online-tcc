import { NextFunction, Request, Response } from "express";
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

    async getUser(req: Request, res: Response): Promise<Response> {
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

    async deleteUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const sql = "DELETE FROM users WHERE id = ?";
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

    async getOneUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        console.log(id);

        const sql = "SELECT * FROM users WHERE id = ?";
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
    
    async updateUser(req: Request, res: Response) {
        const { id, name, email, password, date, cpf, tel } = req.body;

        const sql = "UPDATE users SET name = ?, email = ?, password = ?, date = ?, cpf = ?, telephone = ? WHERE id = ?";
        const values: Array<string> = [ name, email, password, date, cpf, tel, id ];

        try {
            const [results]: [ResultSetHeader, FieldPacket[]] = await connect.promise().query(sql, values);

            if(results) {
                return res.status(201).json({
                    error: false,
                    message: "O usuário foi atualizado com sucesso.",
                    user: {
                        name
                    }
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