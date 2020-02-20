import { IClient } from '../interfaces/clients.interface';

export class Client implements IClient {
    constructor(
       public id: number,
       public name: string,
       public phone: number,
       public email: string,
       public message: string
    ) {}
}
