import { Component, OnInit, Input } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { FormControl } from '@angular/forms';
import { TasksService } from '../tasks.service';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';


export class State {
  constructor(public name: string) { }
}

@Component({
  selector: 'app-page-features',
  templateUrl: './page-features.component.html',
  styleUrls: ['./page-features.component.css']
})
export class PageFeaturesComponent implements OnInit {

  
  ngOnInit() {
  }
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;

  states: State[] = [
    {
      name: 'Bangalore',
    },
    {
      name: 'Electronic City',
    },
    {
      name: 'Arkansas',
    },
    {
      name: 'California',
    },
    {
      name: 'Florida',
    },
    {
      name: 'Texas',
    }
  ];
  tasks: any;

  constructor(private tasksService:TasksService) {
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.filterStates(state) : this.states.slice())
      );
      this.tasksService.getRides()
        .subscribe(tasks => {
          this.tasks= tasks;
            console.log(tasks);
        });
  }

  filterStates(name: string) {
    return this.states.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

getUser(){
  this.tasksService.getUsers()
  .subscribe(task => {
     this.tasks= task;
      console.log(task);
  });
}

updateSeatCount(){
  var rideTxt = '{' +
      '"id" : 12345,' +
      '"rider_id" : 101,' + 
      '"free_seats" : 3,' +
      '"start_time" : "20/02/2018 17:30:00",' +
      '"from" :{' +
          '"building": "3B",' +
          '"street": "Eco Space",' +
          '"zipcode": "104233"' +
      '},' +
      '"to" : {' +
          '"building": "1007",'+
          '"street": "Morris Park Ave",'+
          '"zipcode": "10462"'+
      '},'+
      '"preferences" : {'+
          '"pref_id" : 7698,'+
          '"isSmokingAllowed" : false,'+
          '"isPetAllowed" : false,'+
          '"sameGenderFlag" : false'+
      '},'+
      '"list_of_co_riders" : [203],'+
      '"cost_per_person" : 100,'+
      '"timestamp" : "20/02/2018 17:00:00"'+
  '}'
  var ride = JSON.parse(rideTxt);
  // console.log(ride);
  this.tasksService.updateSeatsCount(ride).subscribe(
         data => {
         console.log('ride updated')
         },
       error => {
           console.error("Error saving ride!");
           return Observable.throw(error);
         }
       );
}

}






