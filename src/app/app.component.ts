import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        city: ['', Validators.required],
        country: ['', Validators.required]
      }),
      terms: ['', Validators.requiredTrue]
    });

    // this.form.valueChanges.subscribe(value => {
    //   console.log(
    //     '%c 🍮 this.form: ',
    //     'font-size:20px;background-color: #6EC1C2;color:#fff;',
    //     this.form
    //   );
    // });
  }
}
