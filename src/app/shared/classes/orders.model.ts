import { IOrder } from '../interfaces/orders.interface';


export class Order implements IOrder {
    constructor(
    public id: number,
    public name: string,
    public phoneNumber: string,
    public email: string,
    public viber: string,
    public brand: string,
    public model: string,
    public year: string,
    public engine: string,
    public fuel: string,
    public probig: string,
    public transmission: string,
    public bodyType: string,
    public price: string,
    public interior: string,
    public interiorColor: string,
    public message: string
    ) {}
}
