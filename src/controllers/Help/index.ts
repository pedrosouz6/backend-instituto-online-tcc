import { Request, Response } from "express";
import { connect } from "../../services/connection";

export class ControllerHelp {
    async create(req: Request, res: Response) {
        const { title, description, id } = req.body;

        const date = new Date().toJSON().slice(0,10).replace(/-/g,'.');
        const numberRandom = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);

        const id_proto = date + '.' + numberRandom;

        const sql = "INSERT INTO help (id, title, description, status, date, id_user) VALUES(?, ?, ?, ?, ?, ?)";
        const values = [ id_proto, title, description, 'em espera',  date, id ];

        try {
            const [ results ] = await connect.promise().query(sql, values);

            return res.status(201).json({
                error: false,
                message: 'Você acabou de fazer um chamado',
                results
            })
        } catch(err) {
            return res.status(401).json({
                error: true,
                message: 'Erro ao tentar criar um chamado'
            })
        }
    }

    async get(req: Request, res: Response) {
        const sql = 'SELECT * FROM help';

        try {
            const [ results ] = await connect.promise().query(sql);

            return res.status(200).json({
                error: false,
                message: 'Todos os pedidos de ajudar foram obtidos',
                results
            })
        } catch(err) {
            return res.status(401).json({
                error: true,
                message: 'Erro ao obter os pedidos de ajudar'
            })
        }
    }

    async getOne(req: Request, res: Response) {
        const { id } = req.params;
        console.log(id);

        const sql = 'SELECT * FROM help WHERE id_user = ?';
        const values = [ id ];

        try {
            const [ results ] = await connect.promise().query(sql, values);

            return res.status(200).json({
                error: false,
                message: 'Todos os pedidos do usuário específico',
                results
            })
        } catch(err) {
            return res.status(401).json({
                error: true,
                message: 'Erro ao obter os pedidos de ajudar'
            })
        }
    }
}  