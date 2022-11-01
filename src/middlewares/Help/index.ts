import { NextFunction, Request, Response } from "express";

export class MiddlewareHelp {
    validation(req: Request, res: Response, next: NextFunction): Response | NextFunction {
        const { title, description } = req.body;

        if(title.trim() === '' || description.trim() === '') {
            return res.status(401).json({
                error: true,
                message: 'Preencha o(s) campo(s).'
            })
        }

        if(title.trim().length > 100) {
            return res.status(401).json({
                error: true,
                message: 'O título deve ser menor ou igual a 100 caracteres.'
            })
        }

        if(description.trim().length > 250) {
            return res.status(401).json({
                error: true,
                message: 'A descrição deve ser menor ou igual a 250 caracteres.'
            })
        }

        next();
    }
}