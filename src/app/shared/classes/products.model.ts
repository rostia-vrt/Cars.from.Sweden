import { IProduct } from '../interfaces/products.interface';

export class Product implements IProduct {
    constructor(
       public id: number,
       public title: string,
       public bodyType: string,
       public probig: string,
       public korobka: string,
       public transmission: string,
       public engine: string,
       public bodyColor: string,
       public interior: string,
       public consumption: string,
       public price: string
    ) { }
}
