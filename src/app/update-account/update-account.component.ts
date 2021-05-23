import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {

  formModel: FormGroup;

  constructor(private fb: FormBuilder, public service: UserService) { }

  ngOnInit(): void {
    this.formModel = this.fb.group({
      Email: ['', [Validators.required, Validators.email]]
    });

    this.service.getUpdateAccount().subscribe(
      res => {
        this.formModel.get('Email').setValue(res['email']);
      },
      err => {
        console.log(err);
      },
    );
  }

  onSubmit() {
    this.service.updateAccount(this.formModel.value).subscribe(
      (res: any) => {

        if (res.succeeded) {
          this.formModel.reset();
          console.log('Success: Account update successful.');
        } 
        else {
          res.errors.forEach((element: any) => {
            switch (element.code) {
              default:
                console.log('Error: Update failed.');
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
