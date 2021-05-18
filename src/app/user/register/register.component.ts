import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public service: UserService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {

        if (res.succeeded) {
          this.service.formModel.reset();
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

}
