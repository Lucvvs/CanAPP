import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería hacer una solicitud GET a /novedades', () => {
    service.getNovedades().subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiURL']}/novedades`);
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, titulo: 'Test Novedad' }]); 
  });
});