import { TestBed } from '@angular/core/testing';

import { Event.EmmiterService } from './event.emmiter.service';

describe('Event.EmmiterService', () => {
  let service: Event.EmmiterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Event.EmmiterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
