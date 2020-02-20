import { Component, OnInit } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProduct } from 'src/app/shared/interfaces/products.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  constructor(
    private prStorage: AngularFireStorage,
    private productsService: ProductsService,
    private firestore: AngularFirestore
  ) {
    this.getProducts();
  }
  products: Array<IProduct>;
  soldProducts: Array<IProduct>;
  productImage: string;
  id: any;
  title: string;
  bodyType: string = 'Виберіть тип кузова...';
  probig: string;
  korobka: string = 'Виберіть тип коробки...';
  transmission: string = 'Виберіть тип трансмісії...';
  engine: string;
  bodyColor: string;
  interior: string = 'Виберіть салон...';
  consumption: string;
  price: string;
  sold: boolean;

  task: AngularFireUploadTask;
  ref: AngularFireStorageReference;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  urlImage: string;

  ngOnInit() {

  }

  public getProducts() {
    this.productsService.getProducts().subscribe(
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

  public onSubmit(form: NgForm) {
    const data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null) {
      this.firestore.collection('products').add(data);
    } else {
      this.firestore.doc('products' + form.value.id).update(data);
    }
    this.clearForm();
  }

  public clearForm() {
    this.title = '';
    this.bodyType = '';
    this.probig = '';
    this.engine = '';
    this.korobka = '';
    this.transmission = '';
    this.bodyColor = '';
    this.interior = '';
    this.consumption = '';
    this.price = '';
  }
  public upload(event): void {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.prStorage.ref(`images/${id}`);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();
        this.downloadURL.subscribe(url => this.productImage = url);
      })
    ).subscribe();
  }

  public deleteProduct(id: string): void {
    this.firestore.doc('products/' + id).delete();
  }

  public edit(index: number): void {
    this.id = this.products[index].id;
    this.title = this.products[index].title;
    this.bodyType = this.products[index].bodyType;
    this.probig = this.products[index].probig;
    this.korobka = this.products[index].korobka;
    this.transmission = this.products[index].transmission;
    this.engine = this.products[index].engine;
    this.bodyColor = this.products[index].bodyColor;
    this.interior = this.products[index].interior;
    this.price = this.products[index].price;
    this.consumption = this.products[index].consumption;
  }

  public saveChanges(): void {
    this.firestore.collection('products/').doc(this.id).update({
      title: this.title, bodyType: this.bodyType, probig: this.probig,
      korobka: this.korobka, transmision: this.transmission, engine: this.engine, bodyColor: this.bodyColor,
      interior: this.interior, consumption: this.consumption, price: this.price
    });
    this.clearForm();
  }
}
