import { CreateUser } from "../entities/CreateUser";

export interface ICreateUserRepository {
    findByEmail(email: string): Promise<CreateUser>;
    save(datas: CreateUser): Promise<void>
}