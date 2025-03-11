import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../entities/user';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      username: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(25),
        Validators.email
      ]],
      password: ["", [
        Validators.required
      ]],
      passwordAgain: ["", [
        Validators.required
      ]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let password = group.get("password").value;
        let passwordAgain = group.get("passwordAgain").value;
        return password === passwordAgain ? null : {notSame: true};
      }
    });
  }

  get component(){
    return this.form.controls;
  }

  submitted: boolean = false;
  onSubmit(data: User){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
  }

}
