import { Request, Response } from "express";
import { connect } from "../../services/connection";

export class ControllerHelp {
    async create(req: Request, res: Response) {
        const { title, description } = req.body;

        const date = new Date().toJSON().slice(0,10).replace(/-/g,'.');
        const numberRandom = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);

        const id = date + '.' + numberRandom;

        const sql = "INSERT INTO help (id, title, description, status, date) VALUES(?, ?, ?, ?, ?)";
        const values = [ id, title, description, 'em espera',  date ];

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
}  