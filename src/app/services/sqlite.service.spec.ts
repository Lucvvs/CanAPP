import { TestBed } from '@angular/core/testing';
import { SqliteService } from './sqlite.service';
import { Storage } from '@ionic/storage-angular';

describe('SqliteService (Web mode)', () => {
  let service: SqliteService;
  let mockStorage: jasmine.SpyObj<Storage>;

  beforeEach(async () => {
    mockStorage = jasmine.createSpyObj('Storage', ['create', 'get', 'set']);

    await TestBed.configureTestingModule({
      providers: [
        SqliteService,
        { provide: Storage, useValue: mockStorage }
      ]
    }).compileComponents();

    service = TestBed.inject(SqliteService);
  });

  it('debería crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería inicializar el storage sin errores en modo web', async () => {

    mockStorage.get.and.resolveTo(undefined);
    mockStorage.set.and.resolveTo();

    await service['initialize'](); 
    expect(mockStorage.create).toHaveBeenCalled();
    expect(mockStorage.set).toHaveBeenCalledWith('usuarios', jasmine.any(Array));
    expect(mockStorage.set).toHaveBeenCalledWith('contactos', []);
    expect(mockStorage.set).toHaveBeenCalledWith('reservas', []);
  });
});