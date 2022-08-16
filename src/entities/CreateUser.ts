import { uuid } from "uuidv4";

export class CreateUser {
    public readonly id: string;

    public name: string;
    public email: string;
    public password: string;

    constructor(props: Omit<CreateUser, 'id'>, id?: string) {
        Object.assign(this, props);

        if(!id) {
            this.id = uuid();
        }
    }
}