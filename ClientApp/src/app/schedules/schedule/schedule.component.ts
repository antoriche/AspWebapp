import { Component, OnInit } from '@angular/core';
import { Local } from '../../locals/local.model';
import { LocalService } from '../../locals/local.service';
import { Schedule } from '../schedule.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  schedule:Schedule = new Schedule();
  locals:Local[] = [];

  constructor(private localServices:LocalService) {

  }

  ngOnInit() {
    this.localServices.fetchLocalsOnServer().then((locals_:Local[]) => (this.locals = locals_));
  }

}
