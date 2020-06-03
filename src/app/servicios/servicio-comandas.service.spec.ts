import { TestBed } from '@angular/core/testing';

import { ServicioComandasService } from './servicio-comandas.service';

describe('ServicioComandasService', () => {
  let service: ServicioComandasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioComandasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
