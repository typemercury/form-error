import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  template: `
    <p *ngIf="!!text">{{ text }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent implements OnInit {
  _text: string;
  @Input() set text(value: string) {
    if (value !== this._text) {
      this._text = value;
      this.cdr.detectChanges();
    }
  }

  get text() {
    return this._text;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {}
}
