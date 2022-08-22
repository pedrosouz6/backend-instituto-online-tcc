import { User } from "../entities/User";

export interface IUserRepository {
    findByEmail(email: string): Promise<User>;
    save(datas: User): Promise<void>
}