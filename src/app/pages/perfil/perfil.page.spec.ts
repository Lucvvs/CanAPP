import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { SqliteService } from '../../services/sqlite.service';
import { Storage } from '@ionic/storage-angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;
  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(async () => {
    storageSpy = jasmine.createSpyObj('Storage', ['create', 'get', 'set']);

    await TestBed.configureTestingModule({
      declarations: [PerfilPage],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: Storage, useValue: storageSpy },
        SqliteService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});