import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InicioPage } from './inicio.page';
import { RouterModule } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { HeaderModule } from '../../components/header/header.module';

@NgModule({
  declarations: [InicioPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatRadioModule,
    HeaderModule,
    RouterModule.forChild([{ path: '', component: InicioPage }])
  ]
})
export class InicioPageModule {}