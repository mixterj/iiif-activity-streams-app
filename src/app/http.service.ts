import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService{
    
  constructor(private http: Http) { }
  
  getJson(url): Promise<any> {
      return this.http.get(url)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

  putJson(url,json): Promise<any> {
      return this.http.put(url, json)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  
}