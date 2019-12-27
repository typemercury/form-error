import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[controlErrorAnchor]'
})
export class ControlErrorAnchorDirective {
  constructor(public vcr: ViewContainerRef) {}
}
