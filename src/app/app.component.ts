import { Component } from '@angular/core';
import { SqliteService } from './services/sqlite.service'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(private sqliteService: SqliteService) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.sqliteService.initialize();
  }
}