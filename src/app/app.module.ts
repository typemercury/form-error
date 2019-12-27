import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ControlErrorsDirective } from './control-errors.directive';
import { ControlErrorComponent } from './control-error/control-error.component';
import { FormSubmitDirective } from './form-submit.directive';
import { ControlErrorAnchorDirective } from './control-error-anchor.directive';

@NgModule({
  declarations: [AppComponent, ControlErrorsDirective, ControlErrorComponent, FormSubmitDirective, ControlErrorAnchorDirective],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ControlErrorComponent]
})
export class AppModule {}
