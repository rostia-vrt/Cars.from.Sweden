import { Component, OnInit } from '@angular/core';
import { IClient } from 'src/app/shared/interfaces/clients.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.component.html',
  styleUrls: ['./admin-clients.component.css']
})
export class AdminClientsComponent implements OnInit {
  clients: Array<IClient>;
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  message: string;

  constructor(private firestore: AngularFirestore) {
    this.getClients();
   }

  ngOnInit() {
  }

  public getClients() {
    this.firestore.collection('clients').snapshotChanges().subscribe(
      arrayClients => {
        this.clients = arrayClients.map(client => {
          return {
            id: client.payload.doc.id,
              ...client.payload.doc.data()
          } as IClient;
        });
        console.log(this.clients);
      }
    );
  }

  public deleteClient(id: string): void {
      this.firestore.doc('clients/' + id).delete();
  }
}
