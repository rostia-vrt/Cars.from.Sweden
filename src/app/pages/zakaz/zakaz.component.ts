import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces/orders.interface';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-zakaz',
  templateUrl: './zakaz.component.html',
  styleUrls: ['./zakaz.component.css']
})
export class ZakazComponent implements OnInit {
  orders: Array<IOrder>;
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  viber: string;
  brand: string;
  model: string;
  year: string;
  engine: string;
  fuel: string = 'Виберіть тип палива...';
  probig: string = 'Виберіть пробіг...';
  transmission: string = 'Виберіть тип коробки передач...';
  bodyType: string = 'Виберіть тип кузова...';
  price: string;
  interior: string = 'Виберіть салон...';
  interiorColor: string = 'Виберіть колір салону...';
  message: string;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
  }

  public onSubmit(form: NgForm) {
    const data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null) {
      this.firestore.collection('orders').add(data);
    } else {
      this.firestore.doc('orders' + form.value.id).update(data);
    }
    this.clearForm();
  }

  public clearForm(): void {
    this.name = '';
    this.phoneNumber = '';
    this.email = '';
    this.viber = '';
    this.brand = '';
    this.model = '';
    this.year = '';
    this.engine = '';
    this.fuel = '';
    this.probig = '';
    this.transmission = '';
    this.bodyType = '';
    this.price = '';
    this.interior = '';
    this.interiorColor = '';
    this.message = '';
  }

}
