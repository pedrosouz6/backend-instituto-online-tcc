import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { connect } from "../../services/connection";

import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";


export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User> {
        const sql = `
        SELECT * FROM users 
        WHERE email = ?`;

        const values = [email];
        
        const results: 
        [
            RowDataPacket[] & 
            RowDataPacket[][] & 
            User[] & OkPacket & 
            OkPacket[] & 
            ResultSetHeader, 
            FieldPacket[]
        ] = await connect.promise().query(sql, values);

        const user: User[] = results[0];

        return user[0];
    }

    async save(datas: User): Promise<void> {
        console.log("datas");
    }
}