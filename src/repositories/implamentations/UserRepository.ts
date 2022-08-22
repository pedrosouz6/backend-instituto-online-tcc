import { RowDataPacket } from 'mysql2';
import { connect } from "../../services/connection";

import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const sql = `
        SELECT * FROM users 
        WHERE email = '${email}'`;

        connect.query(sql, (error, respost: RowDataPacket[]) => {
            if(respost.length > 0) {
                return console.log(respost);  
            }

            return console.log('error.message');
        });

        return null;
    }

    async save(datas: User): Promise<void> {
        console.log(datas);
    }
}