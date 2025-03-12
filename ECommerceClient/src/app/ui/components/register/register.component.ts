import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../entities/user';
import { UserService } from '../../../services/common/models/user.service';
import { CreateUser } from '../../../contracts/users/createUser';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends BaseComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private toastrService: CustomToastrService,
    spinner: NgxSpinnerService
  ) {
    super(spinner);
  }

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
  async onSubmit(user: User){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const result: CreateUser = await this.userService.create(user);
    if(result.succeeded){
      this.toastrService.toastrMessage(result.message, "Kullanıcı kaydı başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }else{
      this.toastrService.toastrMessage(result.message, "HATA", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      });
    }
  }

}
