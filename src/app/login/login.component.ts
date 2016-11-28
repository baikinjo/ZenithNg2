import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit() {
        // reset login status
        this.authService.logout();
    }

  onSubmit(username, password) {
    this.authService.login(username, password).subscribe((result) => {
      if (result) {
        console.log(result);
      }
    });
  }
}
