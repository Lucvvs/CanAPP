import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InicioPage } from './inicio.page';
import { MatRadioModule } from '@angular/material/radio';
import { HeaderModule } from '../../components/header/header.module';
import { TabsModule } from '../../components/tabs/tabs.module';
import { InicioPageRoutingModule } from './inicio-routing.module'; 

@NgModule({
  declarations: [InicioPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatRadioModule,
    HeaderModule,
    TabsModule,
    InicioPageRoutingModule
  ]
})
export class InicioPageModule {}