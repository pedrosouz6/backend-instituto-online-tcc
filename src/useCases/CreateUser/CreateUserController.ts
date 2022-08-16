import { Response,Request } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    constructor(
        private createUserUseCase: CreateUserUseCase
    ) {}
    
    async execute(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        try {
            await this.createUserUseCase.execute({
                name,
                email,
                password
            })

            return res.status(201).send();

        } catch(err) {
            return res.status(401).json({
                message: err.message
            })
        }

    }
}