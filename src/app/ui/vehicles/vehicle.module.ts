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
import { CVehiculoComponent,FVehiculoComponent } from './c-vehiculo/c-vehiculo.component';
import { DeleteVehiculoComponent, FDeleteVehiculoComponent} from './delete-vehiculo/delete-vehiculo.component';

import { ConfirmDeleteComponent, ConfirmVehiculoComponent} from './confirm-d/confirm-d.component';

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
  declarations: [
    CalendarHeaderComponent, DateTimePickerComponent, VehiclesComponent, 
    CVehiculoComponent,FVehiculoComponent, 
    DeleteVehiculoComponent, FDeleteVehiculoComponent,
    ConfirmVehiculoComponent,
    ConfirmDeleteComponent
  ],
  exports: [CalendarHeaderComponent, DateTimePickerComponent],
  entryComponents: [FVehiculoComponent,FDeleteVehiculoComponent,
     ConfirmVehiculoComponent
  ]
})
export class VehicleModule { }
