import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioPage } from './inicio.page';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const apiSpy = jasmine.createSpyObj('ApiService', ['getNovedades']);

    // Simula respueta dfe la api
    apiSpy.getNovedades.and.returnValue(of([
      { titulo: 'Mock Novedad', img: 'img.jpg', descripcion: 'Texto mock' }
    ]));

    //  geolocalización
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
      declarations: [InicioPage],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ApiService, useValue: apiSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería agregar novedades desde la API al entrar en la vista', () => {
    const inicial = component.novedades.length;
    component.ionViewWillEnter();
    expect(component.novedades.length).toBe(inicial + 1);
  }); 
});