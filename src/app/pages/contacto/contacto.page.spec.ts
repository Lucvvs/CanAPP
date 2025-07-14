import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactoPage } from './contacto.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SqliteService } from '../../services/sqlite.service';
import { Storage } from '@ionic/storage-angular';
import { IonicModule } from '@ionic/angular';

describe('ContactoPage', () => {
  let component: ContactoPage;
  let fixture: ComponentFixture<ContactoPage>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const toastSpy = jasmine.createSpyObj('ToastController', ['create']);
    const sqliteSpy = jasmine.createSpyObj('SqliteService', ['addContacto']);
    const storageSpy = jasmine.createSpyObj('Storage', ['create', 'get', 'set']);

    await TestBed.configureTestingModule({
      declarations: [ContactoPage],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        IonicModule.forRoot()
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ToastController, useValue: toastSpy },
        { provide: SqliteService, useValue: sqliteSpy },
        { provide: Storage, useValue: storageSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con controles válidos', () => {
    expect(component.contactoForm.contains('nombre')).toBeTrue();
    expect(component.contactoForm.contains('email')).toBeTrue();
    expect(component.contactoForm.contains('tipoSolicitud')).toBeTrue();
    expect(component.contactoForm.contains('mensaje')).toBeTrue();
  });
});