import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    // tslint:disable-next-line:max-line-length
    <iframe src="https://calendar.google.com/calendar/embed?src=s71jbni0tj1mjqeb30le82kob8%40group.calendar.google.com&ctz=Europe%2FMadrid" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
  `
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}