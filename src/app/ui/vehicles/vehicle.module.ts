import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from 'ngx-contextmenu';
import {
  NgbDatepickerModule,
  NgbTimepickerModule
} from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar-header.component';
import { DateTimePickerComponent } from './date-time-picker.component';
import { VehiclesComponent } from './vehicles.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    ContextMenuModule.forRoot({
      useBootstrap4: true
    }),
    CalendarModule
  ],
  declarations: [CalendarHeaderComponent, DateTimePickerComponent, VehiclesComponent],
  exports: [CalendarHeaderComponent, DateTimePickerComponent]
})
export class VehicleModule { }
