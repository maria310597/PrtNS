import { Injectable } from '@angular/core';
import { PartesService } from '../services/partes.service';
import { UserService } from '../services/user.service';
import { CompanyService } from '../services/company.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Report } from '../models/report';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import * as crypto from 'crypto-js';

import { Company } from '../models/company';
import { NotifyService } from './notify.service';
import { User } from '../models/user';
import { Frase } from '../models/frase';
import { FrasesService } from '../services/frases.service';
import { NotificationsService } from 'angular2-notifications';

interface Backup{
  reports: Report[];
  users: User[];
  companys: Company[];
  frases: Frase[];
} 

@Injectable()
export class AdminToolsService {
  public downloadJsonHref;
  public importando: boolean;
  public cryptkey = "neosistecMola";
  constructor(private partesService:PartesService,
              private userService:UserService,
              private companyService: CompanyService,
              private frasService: FrasesService,
              private sanitizer: DomSanitizer,
              private notifyService: NotificationsService) { }



  backup(options: any){
    let allData = [];
    var json = {reports: [],companys: [],users: []};
    allData.push(this.partesService.getCollection$());
    allData.push(this.companyService.getCollection$());
    allData.push(this.userService.getAllUsers$());
    Observable.combineLatest(allData).subscribe(data => {
      for(let o of options.options){
        switch(o.id){
          case 1:
          if(o.selected){
            json = {reports: data[0],companys: data[1],users: data[2]};
          }
          break;
          case 2:
          if(o.selected){
            json.reports = data[0];
          }
          break;
          case 3:
          if(o.selected){
            json.users = data[2];
          }
          break;
          case 4:
          if(o.selected){
            json.companys = data[1];
          }
          break;
        }
      };
        this.toJson(json);
    });
  }

  toJson(data: any) {
    let theJSON = JSON.stringify(data, null, "\t");
    var crypt = crypto.AES.encrypt(theJSON,this.cryptkey); // Encriptamos datos
    let blob = new Blob([crypt]);
    let url= window.URL.createObjectURL(blob);
    let uri: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    this.downloadJsonHref = uri;
  }

  import(data:string){
     this.importando = true;
     var regis = 0;
     var bytes  = crypto.AES.decrypt(data.toString(), this.cryptkey);
     var plaintext = bytes.toString(crypto.enc.Utf8);
     var newData: Backup = JSON.parse(plaintext);
      for(let parte of newData.reports){
        this.partesService.add(parte);
        regis++;
      }
      for(let company of newData.companys){
        this.companyService.add(company);
        regis++;
      }
      for(let f of newData.frases){
        this.frasService.addFrase(f);
        regis++;
      }
    
      // TODO Añadimos users
      // Faltan cosas de implementar para añadir usuarios tan facil
      this.notifyService.success("Se han añadido " + regis + " a la base de datos.",'', {
        timeOut: 3000,
        showProgressBar: false,
        pauseOnHover: true,
        clickToClose: true
      });
      this.importando = false;
  }

}
