import { TestBed } from '@angular/core/testing';

import { ServicioProductoPedidoService } from './servicio-producto-pedido.service';

describe('ServicioProductoPedidoService', () => {
  let service: ServicioProductoPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioProductoPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
