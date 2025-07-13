import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SqliteService } from '../../services/sqlite.service';
import { AuthenticationService } from '../../services/authentication.service';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular'

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [ReactiveFormsModule, IonicModule.forRoot()],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: SqliteService, useValue: jasmine.createSpyObj('SqliteService', ['authenticate', 'getUsuario']) },
        { provide: AuthenticationService, useValue: jasmine.createSpyObj('AuthenticationService', ['login']) },
        { provide: ToastController, useValue: jasmine.createSpyObj('ToastController', ['create']) },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener controles email y password en el formulario', () => {
    expect(component.loginForm.contains('email')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();
  });

  it('debería marcar el formulario como inválido si está vacío', () => {
    component.loginForm.setValue({ email: '', password: '' });
    expect(component.loginForm.valid).toBeFalse();
  });

  it('debería mostrar mensaje de error si el login es inválido', () => {
    component.loginForm.setValue({ email: '', password: '' });
    component.login();
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('.login-error'));
    expect(errorElement).toBeTruthy();
    expect(component.loginError).toBe('Completa todos los campos');
  });

  it('debería llamar a irARegistro() al hacer clic en el texto de registro', () => {
    spyOn(component, 'irARegistro');
    const registro = fixture.debugElement.query(By.css('.registro-link'));
    registro.triggerEventHandler('click');
    expect(component.irARegistro).toHaveBeenCalled();
  });
});