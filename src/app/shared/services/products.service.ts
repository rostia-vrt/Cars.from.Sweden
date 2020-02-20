import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: AngularFirestore) {
   }


   public getProducts(): any {
    return this.firestore.collection('products').snapshotChanges();

  }
}


