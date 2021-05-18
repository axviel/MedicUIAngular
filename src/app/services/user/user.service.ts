import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  readonly BaseURI = 'http://localhost:58717/api';

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl !== null && (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors)) {
      let pswdCtrl = fb.get('Password');

      if (pswdCtrl !== null && (pswdCtrl.value != confirmPswrdCtrl.value))
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);

    }
  }

  register() {
    
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password
    };

    return this.http.post(this.BaseURI + '/authentication/register', body);
  }

  login(formData: any) {
    return this.http.post(this.BaseURI + '/authentication/login', formData);
  }
  
  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }
}
