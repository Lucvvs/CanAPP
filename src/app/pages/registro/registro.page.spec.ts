import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SqliteService } from '../../services/sqlite.service';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';
import { IonicModule } from '@ionic/angular';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;
  let sqliteSpy: jasmine.SpyObj<SqliteService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    sqliteSpy = jasmine.createSpyObj('SqliteService', ['getUsuarios', 'addUsuario']);
    const apiSpy = jasmine.createSpyObj('ApiService', ['getNacionalidades']);

    await TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [ReactiveFormsModule, IonicModule.forRoot()],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: SqliteService, useValue: sqliteSpy },
        { provide: ApiService, useValue: apiSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;

    // Simula que el API devuelve nacionalidades
    const api = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    api.getNacionalidades.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener todos los controles en el formulario', () => {
    const form = component.registroForm;
    expect(form.contains('nombre')).toBeTrue();
    expect(form.contains('apellido')).toBeTrue();
    expect(form.contains('fechaNacimiento')).toBeTrue();
    expect(form.contains('nacionalidad')).toBeTrue();
    expect(form.contains('comuna')).toBeTrue();
    expect(form.contains('direccion')).toBeTrue();
    expect(form.contains('email')).toBeTrue();
    expect(form.contains('password')).toBeTrue();
  });

  it('debería marcar el formulario como inválido si está vacío', () => {
    expect(component.registroForm.valid).toBeFalse();
  });

  it('no debería registrar si el formulario es inválido', async () => {
    spyOn(component, 'registrar').and.callThrough();
    await component.registrar();
    expect(component.registroForm.invalid).toBeTrue();
  });


});