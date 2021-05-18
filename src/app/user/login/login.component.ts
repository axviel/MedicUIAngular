import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formModel: FormGroup;

  constructor(private fb: FormBuilder, private service: UserService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');

    this.formModel = this.fb.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.service.login(this.formModel.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/home');
      },
      err => {
        if (err.status == 400)
          console.log('Incorrect username or password. Authentication failed.');
        else
          console.log(err);
      }
    );
  }

}
