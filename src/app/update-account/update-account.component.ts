import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {

  formModel: FormGroup;

  constructor(private fb: FormBuilder, public service: UserService, private notifier: NotifierService) { }

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
          this.notifier.notify('success', 'Account update successful');
        } 
        else {
          res.errors.forEach((element: any) => {
            switch (element.code) {
              default:
                this.notifier.notify('error', 'Update failed.');
                break;
            }
          });
        }

      },
      err => {
        this.notifier.notify('error', err.message);
        console.log(err);
      }
    );
  }

}
