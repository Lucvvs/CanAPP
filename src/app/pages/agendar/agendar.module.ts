import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendarPage } from './agendar.page';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HeaderModule } from '../../components/header/header.module';

@NgModule({
  declarations: [AgendarPage],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: AgendarPage }]),
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HeaderModule
  ]
})
export class AgendarPageModule {}