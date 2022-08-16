import { CreateUser } from "../../entities/CreateUser";
import { ICreateUserRepository } from "../../repositories/ICreateUserRepository";
import { ICreateUserDTO } from "./CreateUserDTO";

export class CreateUserUseCase {

    constructor(
        private createUserRepository: ICreateUserRepository
    ) {}
    
    async execute(props: ICreateUserDTO) {
        const isEmailAlreadyExists = this.createUserRepository.findByEmail(props.email);

        if(isEmailAlreadyExists) {
            throw new Error('O email ja está em uso');
        }

        const createUser = new CreateUser(props);

        this.createUserRepository.save(createUser);
    }
}