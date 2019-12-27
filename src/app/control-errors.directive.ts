import {
  Directive,
  OnInit,
  Inject,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  Optional,
  Host,
  Input
} from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { FORM_ERRORS, FormErrors } from './control-errors';
import { ControlErrorComponent } from './control-error/control-error.component';
import { pipe } from 'ramda';
import { FormSubmitDirective } from './form-submit.directive';
import { Observable, EMPTY, merge } from 'rxjs';
import { ControlErrorAnchorDirective } from './control-error-anchor.directive';

@Directive({
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements OnInit {
  @Input() customErrors = {};
  private _errorComponentRef: ComponentRef<ControlErrorComponent>;
  private _errorViewContainerRef: ViewContainerRef;

  formSubmit$: Observable<Event>;

  showError = pipe<ValidationErrors, string, void>(
    this.getErrorMesaage.bind(this),
    this.setError.bind(this)
  );

  constructor(
    private control: NgControl,
    private vcr: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    @Inject(FORM_ERRORS) private defaultErrors: FormErrors,
    @Optional() @Host() private formSubmitDir: FormSubmitDirective,
    @Optional() private errorAnchorDir: ControlErrorAnchorDirective
  ) {
    this.formSubmit$ = this.formSubmitDir ? this.formSubmitDir.submit$ : EMPTY;
    this._errorViewContainerRef = this.errorAnchorDir
      ? this.errorAnchorDir.vcr
      : this.vcr;
  }

  ngOnInit() {
    const mapToErrors = map(_ => this.control.errors);

    const controlErrorsChanged$ = this.control.valueChanges.pipe(
      mapToErrors,
      distinctUntilChanged(
        (prev, curr) =>
          this.getFirstErrorName(prev) === this.getFirstErrorName(curr)
      )
    );

    merge(this.formSubmit$.pipe(mapToErrors), controlErrorsChanged$).subscribe(
      controlErrors => {
        if (controlErrors) {
          this.showError(controlErrors);
        } else {
          this.removeError();
        }
      }
    );
  }

  getErrorMesaage(errors: ValidationErrors): string {
    const errorName = this.getFirstErrorName(errors);
    if (this.customErrors[errorName]) {
      return this.customErrors[errorName];
    } else {
      const getErrorText = this.defaultErrors[errorName];
      return getErrorText ? getErrorText(errors[errorName]) : null;
    }
  }

  getFirstErrorName(errors: ValidationErrors) {
    if (!errors) {
      return '';
    }
    const keys = Object.keys(errors);
    return keys ? keys[0] : '';
  }

  setError(text: string) {
    if (!this._errorComponentRef) {
      const factory = this.cfr.resolveComponentFactory(ControlErrorComponent);
      this._errorComponentRef = this._errorViewContainerRef.createComponent(
        factory
      );
    }
    this._errorComponentRef.instance.text = text;
  }

  removeError() {
    this.setError(null);
  }
}
