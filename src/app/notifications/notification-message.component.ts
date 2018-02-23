import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';

import { NotifyService } from '../core/notify.service';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationMessageComponent implements OnInit {

  constructor(public notify: NotifyService) { }
  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;

  ngOnInit(): void {
    setTimeout(() => this.staticAlertClosed = true, 2000);
  }
}
