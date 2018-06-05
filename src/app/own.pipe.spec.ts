import { OwnPipe } from './own.pipe';

describe('OwnPipe', () => {
  it('create an instance', () => {
    const pipe = new OwnPipe();
    expect(pipe).toBeTruthy();
  });
});
