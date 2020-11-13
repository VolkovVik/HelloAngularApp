import { ReversePipe } from './reverse.pipe';

let pipe;
beforeEach(()=>{
  pipe = new ReversePipe();
});

describe('ReversePipe', () => {
  it('create an instance', () => {
    //const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform', () => {
    //const pipe = new ReversePipe();
    expect(pipe.transform('123')).toBe('321');
  });

  it('should error', () => {
    //const pipe = new ReversePipe();
    expect(()=>{
      pipe.transform('error'); 
    }).toThrowError ('ReversePipe: error string');
  });

});
