import { NextFunction, Request, Response } from "express";

import { userValidations } from "../../instance/User";

export class MiddlewareUser {
    createUser(req: Request, res: Response, next: NextFunction): Response {
        const { name, email, password, date, cpf, tel } = req.body;

        if(!(name.trim() && date.trim() && password.trim() && email.trim() && cpf.trim() && tel.trim())) {
            return res.status(412).json({
                error: true,
                message: "Os campos estão vázios"
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

        next();
    }
}