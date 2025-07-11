import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoPage } from './contacto.page';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderModule } from '../../components/header/header.module';

@NgModule({
  declarations: [ContactoPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HeaderModule,
    RouterModule.forChild([{ path: '', component: ContactoPage }])
  ]
})
export class ContactoPageModule {}