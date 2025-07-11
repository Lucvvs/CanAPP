import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PerfilPage } from './perfil.page';
import { HeaderModule } from '../../components/header/header.module';

@NgModule({
  declarations: [PerfilPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    RouterModule.forChild([{ path: '', component: PerfilPage }])
  ]
})
export class PerfilPageModule {}