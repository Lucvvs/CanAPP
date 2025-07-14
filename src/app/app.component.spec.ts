import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Platform } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { Storage } from '@ionic/storage-angular';
import { SqliteService } from './services/sqlite.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    const platformSpy = jasmine.createSpyObj('Platform', ['ready']);
    const sqliteSpy = jasmine.createSpyObj('SqliteService', ['initialize']);
    const storageSpy = jasmine.createSpyObj('Storage', ['create', 'get', 'set']);

    platformSpy.ready.and.resolveTo();

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: Platform, useValue: platformSpy },
        { provide: SqliteService, useValue: sqliteSpy },
        { provide: Storage, useValue: storageSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});