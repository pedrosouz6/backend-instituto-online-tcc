import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { connect } from "../../services/connection";
import { config } from "../../services/jwt";

export class MiddlewareToken {
    async validateToken(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { token } = req.body;

        try {
            const { id } = verify(token, config.secret) as JwtPayload;
            
            const sql = 'SELECT * FROM users WHERE id = ?';
            const values = [ id ];

            const [ results ] = await connect.promise().query(sql, values);

            return res.status(200).json({
                results,
                error: false,
                message: 'O token está válido'
            })
        } catch(err) {
            return res.status(406).json({
                error: true,
                message: 'O token está inválido'
            })
        }
    }
}