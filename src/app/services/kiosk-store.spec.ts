import { TestBed } from '@angular/core/testing';

import { KioskStore } from './kiosk-store';

describe('KioskStore', () => {
  let service: KioskStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KioskStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
