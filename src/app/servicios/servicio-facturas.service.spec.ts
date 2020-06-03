import { TestBed } from '@angular/core/testing';

import { ServicioFacturasService } from './servicio-facturas.service';

describe('ServicioFacturasService', () => {
  let service: ServicioFacturasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioFacturasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
