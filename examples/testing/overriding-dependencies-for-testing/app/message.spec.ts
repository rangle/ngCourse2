import {MessageComponent} from './message.component';
import { provide } from '@angular/core';
import {
  async,
  inject,
  TestBed,
} from '@angular/core/testing';

describe('MessageComponent', () => {
  
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent],
      providers: []
    });
  
    fixture = TestBed.overrideComponent(MessageComponent, { 
      set: {
        template: '<span>{{message}}</span>'
      }})
      .createComponent(MessageComponent);
  
    fixture.detectChanges();
  });

  it('should set the message', async(inject([], () => {
    fixture.componentInstance.setMessage('Test message');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('span').innerText).toEqual('Test message');
    });
  })));

});
