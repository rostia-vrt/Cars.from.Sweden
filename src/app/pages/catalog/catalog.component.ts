import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/products.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products: Array<IProduct>;
  constructor(private firestore: AngularFirestore) {
    this.getProducts();
   }

  ngOnInit() {
  }

  public getProducts() {
    this.firestore.collection('products').snapshotChanges().subscribe(
      arrayProducts => {
        this.products = arrayProducts.map(product => {
          return {
            id: product.payload.doc.id,
              ...product.payload.doc.data()
          } as IProduct;
        });
        console.log(this.products);
      }
    );
  }
}
