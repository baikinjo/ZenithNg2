import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {
  private loggedIn = false;
  private canScroll = false;

  constructor(private http: Http, private router: Router) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(username, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let creds: string = 'username='+username+'&password='+password+'&grant_type=password';
    return this.http
      .post(
        'http://http://zencore.azurewebsites.net/connect/token', 
        creds,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
      	if (res.access_token) {
          localStorage.setItem('auth_token', res.access_token);
          this.loggedIn = true;
          this.determineRole();
          return true;
        }
        return false;
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this.canScroll = false;
  }

  determineRole(){
    let permissionsURL = "http://http://zencore.azurewebsites.net/api/eventsapi/getpermission"
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http.get(permissionsURL, {headers})
      .map(res => res.json())
      .subscribe(
        data => {this.canScroll = true; this.router.navigate(['event']);},
        err => {this.canScroll = false; this.router.navigate(['event']);},
      );
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  canScrollWeek() {
    return this.canScroll;
  }
}
