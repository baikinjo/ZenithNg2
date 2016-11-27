import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthenticationService {
  private loggedIn = false;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(username, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let creds: string = 'username='+username+'&password='+password+'&grant_type=password';
    console.log(creds);
    return this.http
      .post(
        'http://localhost:5000/connect/token', 
        creds,
        { headers }
      )
      // .map(res => {
      .map(res => res.json())
      .map((res) => {
      	if (res.access_token) {
      		// res => res.json();
      		console.log(res);
        // if (res.success) {
          localStorage.setItem('auth_token', res.access_token);
          this.loggedIn = true;
          return true;
        }

        return false;
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
