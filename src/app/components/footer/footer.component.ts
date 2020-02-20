import { Component, OnInit } from '@angular/core';
import { IClient } from 'src/app/shared/interfaces/clients.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  clients: Array<IClient>;
  name: string;
  phoneNumber: string;

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

  public clearForm(): void  {
    this.name = '';
    this.phoneNumber = '';
  }
}
