import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private _formBuilder : FormBuilder,
              private authService : AuthService) { }

  ngOnInit(): void {
    this.loginForm = this._builderForm();
  }

  _builderForm(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(pattern)]],
      password: ['', [Validators.required]]
    }) 
    form.valueChanges.subscribe(()=>{
      // this.invalidForm = this.loginForm.invalid;
    });
    return form;
  }
     /**Getters */
     get username() { return this.loginForm.controls['username']; }
     get password() { return this.loginForm.controls['password']; }

  login(){
    // console.log('login', this.loginForm.value)

    this.authService.login(this.loginForm.value).subscribe(res =>{
      console.log(res);
    })
  }

}
