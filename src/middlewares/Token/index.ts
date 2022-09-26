import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../../services/jwt";

export class MiddlewareToken {
    validateToken(req: Request, res: Response, next: NextFunction): Response {
        const { token } = req.body;

        try {
            verify(token, config.secret);

            return res.status(200).json({
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