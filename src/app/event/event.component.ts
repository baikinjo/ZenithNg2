import { Component, OnInit, ViewChildren,QueryList,ContentChildren} from '@angular/core';
import {Event} from '../event';
import {EventService} from '../event.service';
import {WeekComponent} from './week/week.component'
import {AuthenticationService} from '../authentication.service'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
    
})
export class EventComponent implements OnInit {
  loggedIn = false;
  canScroll = false;
  currentDate: Date = new Date();
  dayDifference = 0;

  @ViewChildren(WeekComponent)
    viewChildren: QueryList<WeekComponent>;

  constructor(private eventService: EventService, private user: AuthenticationService) { }

  ngOnInit() {
    // this.loggedIn = this.user.isLoggedIn();
    this.canScroll = this.user.canScrollWeek();
    console.log("can scroll: " + this.canScroll);
  }

  loadPrevWeek(){
    console.log("previous clicked");
    this.dayDifference -= 7;
    console.log(this.dayDifference);
    this.currentDate = new Date();
    this.currentDate.setDate(new Date().getDate() + this.dayDifference);
    console.log('current date: ' + this.currentDate);
    this.viewChildren.toArray().forEach((child) => child.parentSet = true);
    this.viewChildren.toArray().forEach((child) => child.setTime(this.currentDate));
    this.viewChildren.toArray().forEach((child) => child.getAllEvents());
    
  }

  loadNextWeek(){
    console.log("previous clicked");
    this.dayDifference += 7;
    console.log(this.dayDifference);
    this.currentDate = new Date();
    this.currentDate.setDate(new Date().getDate() + this.dayDifference);
    console.log('current date: ' + this.currentDate);
    this.viewChildren.toArray().forEach((child) => child.parentSet = true);
    this.viewChildren.toArray().forEach((child) => child.setTime(this.currentDate));
    this.viewChildren.toArray().forEach((child) => child.getAllEvents());
  }
}
