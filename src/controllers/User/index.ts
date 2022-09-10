import { Request, Response } from "express";

import { connect } from '../../services/connection';

export class ControllerUser {
    createUser(req: Request, res: Response) {
        const { name, email, password, date, cpf, tel } = req.body;

        const sql = "INSERT INTO users (name, email, password, date, cpf, te)"
        res.send()
    }
}