import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formModel: FormGroup;

  constructor(private fb: FormBuilder, public service: UserService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');

    this.formModel = this.fb.group({
      UserName: ['', Validators.required],
      Email: ['', Validators.email],
      Passwords: this.fb.group({
        Password: ['', [Validators.required, Validators.minLength(4)]],
        ConfirmPassword: ['', Validators.required]
      }, { validator: this.comparePasswords })
    });
  }

  onSubmit() {
    this.service.register(this.formModel.value).subscribe(
      (res: any) => {

        if (res.succeeded) {
          this.formModel.reset();
          console.log('Success: New user created! Registration successful.');
        } 
        else {
          res.errors.forEach((element: any) => {
            switch (element.code) {
              case 'DuplicateUserName':
                console.log('Error: Username is already taken. Registration failed.');
                break;

              default:
                console.log('Error: Registration failed.');
                break;
            }
          });
        }

      },
      err => {
        console.log(err);
      }
    );
  }

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

}
