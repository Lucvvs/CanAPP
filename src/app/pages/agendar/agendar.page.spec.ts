import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendarPage } from './agendar.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SqliteService } from '../../services/sqlite.service';
import { IonicModule } from '@ionic/angular';

describe('AgendarPage', () => {
  let component: AgendarPage;
  let fixture: ComponentFixture<AgendarPage>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const toastSpy = jasmine.createSpyObj('ToastController', ['create']);
    const sqliteSpy = jasmine.createSpyObj('SqliteService', ['getReservas', 'addReserva']);


    sqliteSpy.getReservas.and.resolveTo([]);

    // Mock de geolocalizacinn
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((success: any) => {
      const mockCoords = {
        latitude: -33.4372,
        longitude: -70.6506,
        altitude: null,
        accuracy: 1,
        altitudeAccuracy: null,
        heading: null,
        speed: null
      } as any;

      const mockPosition = {
        coords: mockCoords,
        timestamp: Date.now()
      } as any;

      success(mockPosition);
    });

    await TestBed.configureTestingModule({
      declarations: [AgendarPage],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        IonicModule.forRoot()
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ToastController, useValue: toastSpy },
        { provide: SqliteService, useValue: sqliteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario de agendamiento', () => {
    const form = component.agendarForm;
    expect(form).toBeDefined();
    expect(form.contains('nombreMascota')).toBeTrue();
    expect(form.contains('edadMascota')).toBeTrue();
    expect(form.contains('tamanoMascota')).toBeTrue();
    expect(form.contains('fecha')).toBeTrue();
    expect(form.contains('hora')).toBeTrue();
    expect(form.contains('lugarEncuentro')).toBeTrue();
    expect(form.contains('sucursal')).toBeTrue();
  });
});