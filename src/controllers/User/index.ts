import { Request, Response } from "express";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import jwt from 'jsonwebtoken';
import { config } from "../../services/jwt";

import { connect } from '../../services/connection';
import { configCrypto } from "../../instance/Crypto";

interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    telephone: string,
    cpf: string,
    date: Date,
    office: string
}

export class ControllerUser {
    async createUser(req: Request, res: Response): Promise<Response> {
        const { name, email, password, date, cpf, tel, office } = req.body;

        const sql = "INSERT INTO users (name, email, password, date, cpf, telephone, office) VALUES(?, ?, ?, ?, ?, ?, ?)";
        const values: Array<string> = [ name, email, password, date, cpf, tel, office ];

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

    async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const sql = 'SELECT * FROM users WHERE email = ? && password = ?';
        const values = [ email, password ];

        try {
            const [ results ]: [RowDataPacket[] & User[], FieldPacket[]] = await connect.promise().query(sql, values);

            if(results.length === 1) {
                return res.status(200).json({
                    results,
                    message: 'Login realizado',
                    error: false,
                    token: jwt.sign(
                        { id: results[0].id },
                        config.secret,
                        { expiresIn: config.expireIn }
                    )
                });
            }

            if(results.length < 1) {
                return res.status(402).json({
                    message: 'A senha está errada',
                    error: true
                });
            }
        } catch(err) {
            return res.status(402).json({
                message: 'Ocorreu um erro ao tentar fazer o login',
                error: true
            });
        }
    }

    async getUser(req: Request, res: Response): Promise<Response> {
        const { limit, pageNumber, searchUser } = req.params;

        let searchName: string;

        if(searchUser === 'null') {
            searchName = '';
        } else {
            searchName = searchUser;
        }
        
        const start = ( Number(limit) * Number(pageNumber) ) - Number(limit);
        const sql = `SELECT * FROM users WHERE name LIKE '%${searchName}%' ORDER BY id ASC LIMIT ${start}, ${limit}`;
        const sqlPagination = "SELECT id FROM users";

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

    async getUserProjects(req: Request, res: Response): Promise<Response> {
        const { limit, pageNumber, searchUser } = req.params;

        let searchName: string;

        if(searchUser === 'null') {
            searchName = '';
        } else {
            searchName = searchUser;
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
        const { id, name, email, password, date, cpf, tel, office } = req.body;

        const sql = "UPDATE users SET name = ?, email = ?, password = ?, date = ?, cpf = ?, telephone = ?, office = ? WHERE id = ?";
        const values: Array<string> = [ name, email, password, date, cpf, tel, office, id ];

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