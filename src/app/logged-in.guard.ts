import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class LoggedIn implements CanActivate {
  constructor(private user: AuthenticationService) {}

  canActivate() {
    return this.user.isLoggedIn();
  }
}