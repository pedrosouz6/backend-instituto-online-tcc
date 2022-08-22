import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserDTO } from "./CreateUserDTO";

export class CreateUserUseCase {

    constructor(
        private createUserRepository: IUserRepository
    ) {}
    
    async execute(props: ICreateUserDTO) {
        const isEmailAlreadyExists = this.createUserRepository.findByEmail(props.email);

        if(isEmailAlreadyExists) {
            throw new Error('O email ja está em uso');
        }

        const createUser = new User(props);

        this.createUserRepository.save(createUser);
    }
}