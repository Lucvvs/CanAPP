import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PerfilPage } from './perfil.page';
import { HeaderModule } from '../../components/header/header.module';
import { TabsModule } from '../../components/tabs/tabs.module';

@NgModule({
  declarations: [PerfilPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    TabsModule,
    RouterModule.forChild([{ path: '', component: PerfilPage }])
  ]
})
export class PerfilPageModule {}