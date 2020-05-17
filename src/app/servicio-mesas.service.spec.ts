import { TestBed } from '@angular/core/testing';

import { ServicioMesasService } from './servicio-mesas.service';

describe('ServicioMesasService', () => {
  let service: ServicioMesasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioMesasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
