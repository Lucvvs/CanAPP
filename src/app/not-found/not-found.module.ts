import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NotFoundPageRoutingModule } from './not-found-routing.module';
import { NotFoundPage } from './not-found.page';


import { HeaderModule } from '../components/header/header.module';
import { TabsModule } from '../components/tabs/tabs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotFoundPageRoutingModule,
    HeaderModule,  
    TabsModule    
  ],
  declarations: [NotFoundPage]
})
export class NotFoundPageModule {}