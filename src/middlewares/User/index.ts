import { NextFunction, Request, Response } from "express";
import { FieldPacket, RowDataPacket } from "mysql2";

import { userValidations } from "../../instance/User";
import { connect } from "../../services/connection";

export class MiddlewareUser {
    dataValidation(req: Request, res: Response, next: NextFunction): Response {
        const { name, email, password, date, cpf, tel, office } = req.body;

        if(!(name.trim() && date.trim() && password.trim() && email.trim() && cpf.trim() && tel.trim())) {
            return res.status(412).json({
                error: true,
                message: "Para cadastrar o usuário é preciso enviar os dados."
            })
        }

        const validatedName = userValidations.NameValidation(name);
        if(validatedName.error) {
            return res.status(412).json({
                error: validatedName.error,
                message: validatedName.message
            })
        }
        
        const validatedEmail = userValidations.EmailValidation(email);
        if(validatedEmail.error) {
            return res.status(412).json({
                error: validatedEmail.error,
                message: validatedEmail.message
            })
        }

        const validatedPassword = userValidations.PasswordValidation(password);
        if(validatedPassword.error) {
            return res.status(412).json({
                error: validatedPassword.error,
                message: validatedPassword.message
            })
        }

        const validatedDate = userValidations.DateValidation(date);
        if(validatedDate.error) {
            return res.status(412).json({
                error: validatedDate.error,
                message: validatedDate.message
            })
        }

        const validatedCPF = userValidations.CPFValidation(cpf);
        if(validatedCPF.error) {
            return res.status(412).json({
                error: validatedCPF.error,
                message: validatedCPF.message
            })
        }

        const validatedTel = userValidations.TelValidation(tel);
        if(validatedTel.error) {
            return res.status(412).json({
                error: validatedTel.error,
                message: validatedTel.message
            })
        }

        const validatedOffice = userValidations.OfficeValidation(office);
        if(validatedOffice.error) {
            return res.status(412).json({
                error: validatedOffice.error,
                message: validatedOffice.message
            })
        }

        next();
    }

    async findByEmail(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { email } = req.body;

        const sql = "SELECT email FROM users WHERE email = ?";
        const values = [ email ];

        const [results]: [RowDataPacket[], FieldPacket[]] = await connect.promise().query(sql, values);

        if(results.length > 0) {
            return res.status(412).json({
                error: true,
                message: "O e-mail já está cadastrado no banco de dados"
            });
        }

        next();
    }

    async findByEmailLogin(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { email } = req.body;

        const sql = "SELECT email FROM users WHERE email = ?";
        const values = [ email ];

        try {
            const [results]: [RowDataPacket[], FieldPacket[]] = await connect.promise().query(sql, values);
            
            if(results.length < 1) {
                return res.status(412).json({
                    error: true,
                    message: "O e-mail não está cadastrado"
                });
            }

            next();
        } catch(err) {
            return res.status(412).json({
                error: true,
                message: "Ocorreu um erro inesperado ao realizar o login"
            });
        }
    }

    async findByCPF(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { cpf } = req.body;

        const sql = "SELECT cpf FROM users WHERE cpf = ?";
        const values = [ cpf ];

        const [results]: [RowDataPacket[], FieldPacket[]] = await connect.promise().query(sql, values);

        if(results.length > 0) {
            return res.status(412).json({
                error: true,
                message: "O CPF já está cadastrado no banco de dados"
            });
        }

        next();
    }

    async findByEmailUpdate(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { email, id } = req.body;

        const sql = "SELECT email FROM users WHERE id != ? && email = ?";
        const values = [ id, email ];

        const [ results ]: [RowDataPacket[], FieldPacket[]] = await connect.promise().query(sql, values);

        if(results.length > 0) {
            return res.status(412).json({
                error: true,
                message: "O e-mail já está em uso"
            });
        }

        next();
    }

    async findByCPFUpdate(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { cpf, id } = req.body;

        const sql = "SELECT cpf FROM users WHERE id != ? && cpf = ?";
        const values = [ id, cpf ];

        const [results]: [RowDataPacket[], FieldPacket[]] = await connect.promise().query(sql, values);

        if(results.length > 0) {
            return res.status(412).json({
                error: true,
                message: "O CPF já está cadastrado no banco de dados"
            });
        }

        next();
    }
}