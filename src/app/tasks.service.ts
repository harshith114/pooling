import { Injectable } from '@angular/core';
// import {Http, Headers} from '@angular/http';
// import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TasksService {

  constructor(private http: HttpClient) {
    console.log('Task Service Initialized...');
   }

getUsers(){
    return this.http.get('http://localhost:3000/api/users');
}

getRides(){
  return this.http.get('http://localhost:3000/api/rides');
}

putRide(ride){
   return this.http.post('http://localhost:3000/api/ride', ride);
}

updateSeatsCount(ride){
  return this.http.put('http://localhost:3000/api/countUpdate/'+ride.id, ride);
}

}
