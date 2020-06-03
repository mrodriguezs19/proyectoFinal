import { TestBed } from '@angular/core/testing';

import { ServicioAdministradoresService } from './servicio-administradores.service';

describe('ServicioAdministradoresService', () => {
  let service: ServicioAdministradoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioAdministradoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
