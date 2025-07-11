import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroPage } from './registro.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { HeaderModule } from '../../components/header/header.module';

@NgModule({
  declarations: [RegistroPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    HeaderModule,
    RouterModule.forChild([{ path: '', component: RegistroPage }])
  ]
})
export class RegistroPageModule {}
