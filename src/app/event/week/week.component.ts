import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {EventService} from '../../event.service';
import {Event} from '../../event';
import {EventComponent} from '../event.component'
import {AuthenticationService} from '../../authentication.service'


@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {
  results: Array<Event> = [];
  currentWeekResults: Array<Event>
  title: "Events for the week of";
  currentDate: Date;
  parentSet = false;

  constructor(private eventService: EventService) {}
  
  ngOnInit() {
    if (!this.parentSet) this.currentDate = new Date();
  	this.getAllEvents();
  }

  setTime(date){
    this.currentDate = date;
  }

  getAllEvents(): void {
    this.results = [];
    this.eventService.getAll()
      .then(data => this.parseEvents(data));  
  }

  parseEvents(eventList){
    var typedlist: [Event] = eventList;

    var curr = this.currentDate;
    curr.setHours(0,0,0,0);
    var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay() + (curr.getDay() == 0 ?  -6 : 1)));
    var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 8));

    for (let event of typedlist){

      var fromDate = new Date(event.EventFrom);
      var toDate = new Date(event.EventTo);
      if (fromDate >= firstday && toDate < lastday){
        this.results.push(event);
      }
    }
    
    var sortedResults: Array<Event>;
    sortedResults = this.results.slice(0);
    sortedResults.sort((lhs, rhs): number => {
      var lDate = new Date(lhs.EventFrom).getTime();
      var rDate = new Date(rhs.EventFrom).getTime();
      if (lDate == rDate) return 0;
      return lDate < rDate ? -1 : 1;
    });

    this.results = sortedResults;
  }

  previous(){
    console.log("previous clicked");
  	// this.currentDate.setDate(this.currentDate.getDate() - 7);
  }

  next(){
    console.log("next clicked");
  	// this.currentDate.setDate(this.currentDate.getDate() + 7);
  }

}
