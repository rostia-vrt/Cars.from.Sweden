import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminClientsComponent } from './admin/admin-clients/admin-clients.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminComponent } from './admin/admin.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ZakazComponent } from './pages/zakaz/zakaz.component';
import { UploaderComponent } from './admin/admin-products/uploader/uploader.component';
import { UploadTaskComponent } from './admin/admin-products/upload-task/upload-task.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'admin-clients', component: AdminClientsComponent },
      { path: 'admin-orders', component: AdminOrdersComponent },
      {
        path: 'admin-products', component: AdminProductsComponent, children: [
          { path: 'uploader', component: UploaderComponent },
          { path: 'upload-task', component: UploadTaskComponent }]
      },
    ]
  },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'zakaz', component: ZakazComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
