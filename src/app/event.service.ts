import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventService {
  private BASE_URL = "http://http://zencore.azurewebsites.net/api/eventsapi";

  constructor(private http: Http) { }

  // getAll() {
  //   return this.http.get('http://localhost:52377/api/eventsapi')
  //   .map((res: Response) => res.json());
  // }

  getAll() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);


  	return this.http.get(this.BASE_URL, {headers})
      .toPromise()
      .then(response => response.json() as Event[])
      .catch(this.handleError);

     // return this.http.get(this.BASE_URL, {headers})
     //  .map((res: Response) => res.json());
  }

  private handleError(error: any): Promise<any> {
  	console.error('An error occurred', error); // for demo purposes only
  	return Promise.reject(error.message || error);
  }
}
