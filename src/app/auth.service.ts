import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import {environment} from '../environments/environment';

@Injectable()
export class AuthService {
  public apiUrl = environment.apiUrl;
  public  requestedScopes  = 'openid profile read:messages write:messages';
  auth0 = new auth0.WebAuth({
    clientID: 'ltxYz9HvdgDbgc6CGTqVSVo7IJYaVh6D',
    domain: 'studiomoos.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://studiomoos.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/callback',
    scope: this.requestedScopes
  });
  userProfile: any;

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        console.log('we got into the session yeah |autheservice')
        this.router.navigate(['/info']);
      } else if (err) {
        this.router.navigate(['/']);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('name', authResult.idTokenPayload.name);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('name');
    // Go back to the home route
    this.router.navigate(['/info']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb) {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('AccessToken has to be valid! login first');
    }
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      //console.log('sorry');
      cb(err, profile);
    });
    }
  public isAdmin() {
    if (localStorage.getItem('name') === 'Susanne Meyer-Keusch') {
      return true;
    } else {
      return false;
    }
  }
}
