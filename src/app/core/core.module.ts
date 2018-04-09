import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService} from '../services/authentication.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { NotifyService } from './notify.service';
import { AdminToolsService } from './admin-tools.service';
import { FrasesService } from '../services/frases.service';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthenticationService, NotifyService,AdminToolsService,FrasesService]
})
export class CoreModule { }
