import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private firestore: AngularFirestore) { }

  public getCln(): any {
    return this.firestore.collection('clients').snapshotChanges();

  }
}
