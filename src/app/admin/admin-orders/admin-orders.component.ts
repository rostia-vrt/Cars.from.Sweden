import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IOrder } from 'src/app/shared/interfaces/orders.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: Array<IOrder>;
  constructor(private firestore: AngularFirestore,
              private ordersService: OrdersService) {
    this.getOrders();
   }

  ngOnInit() {
  }

  public getOrders() {
    this.ordersService.getOrd().subscribe(
      arrayOrders => {
        this.orders = arrayOrders.map(order => {
          return {
            id: order.payload.doc.id,
              ...order.payload.doc.data()
          } as IOrder;
        });
        console.log(this.orders);
      }
    );
  }

  public deleteOrder(id: string): void {
    this.firestore.doc('orders/' + id).delete();
}

}
