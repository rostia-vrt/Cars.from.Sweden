import { Component, OnInit } from '@angular/core';
import { IClient } from 'src/app/shared/interfaces/clients.interface';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  clients: Array<IClient>;
  name: string;
  phoneNumber: string;
  email: string;
  message: string;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
  }


  public onSubmit(form: NgForm) {
    const data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null) {
      this.firestore.collection('clients').add(data);
    } else {
      this.firestore.doc('clients' + form.value.id).update(data);
    }
    this.clearForm();
  }

  public clearForm(): void {
    this.name = '';
    this.phoneNumber = '';
    this.email = '';
    this.message = '';
  }
}
