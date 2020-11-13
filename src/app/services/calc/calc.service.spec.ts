import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { CalcService } from './calc.service';

describe('CalcService', () => {
  let service: CalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return sum', () => {
    expect(service.sum(3,8)).toBe(11);
  });

  it('should return sum async', fakeAsync(() => {
    service.sumAsync(3,8).then(result=>{expect(result).toBe(11)});
    //flush();
    tick(3000);
  }));

});
