import { Directive, ElementRef, HostBinding } from '@angular/core';
import { fromEvent } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Directive({
  selector: 'form'
})
export class FormSubmitDirective {
  @HostBinding('class.submitted') isSubmitted = false;

  get element() {
    return this.host.nativeElement;
  }

  submit$ = fromEvent(this.element, 'submit').pipe(shareReplay(1));

  constructor(private host: ElementRef<HTMLFormElement>) {
    this.submit$.subscribe(_ => (this.isSubmitted = true));
  }
}
