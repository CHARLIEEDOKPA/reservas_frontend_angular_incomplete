import { TestBed } from '@angular/core/testing';

import { JwtService } from '../services/jwt.service';

describe('LocalStorageService', () => {
  let service: JwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
