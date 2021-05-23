import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  readonly BaseURI = 'http://localhost:58717/api';

  register(formData: any) {
    
    var body = {
      UserName: formData.UserName,
      Email: formData.Email,
      Password: formData.Passwords.Password
    };

    return this.http.post(this.BaseURI + '/authentication/register', body);
  }

  login(formData: any) {
    return this.http.post(this.BaseURI + '/authentication/login', formData);
  }
  
  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }

  changePassword(formData: any){
    return this.http.post(this.BaseURI + '/UserProfile/changepassword', formData);
  }

  updateAccount(formData: any){
    return this.http.post(this.BaseURI + '/UserProfile/updateAccount', formData);
  }

  getUpdateAccount() {
    return this.http.get(this.BaseURI + '/UserProfile/updateAccount');
  }
}
