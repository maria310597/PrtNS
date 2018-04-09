import { Company } from './company';
import { TimeCustom } from './Time';
import { Time } from '@angular/common';
import { NgbTimepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export enum TypeReport{
    Sisemas,
    Postventa,
    Desarrollo
}


export class Report {
    uid?: string;
    operator: string;
    date: NgbDateStruct;
    company: string;
    dBegining: TimeCustom;
    dEnd: TimeCustom;
    notes: string[];
    km: number;
    displacements: boolean;
    parking: number;
    free: boolean;
    interno: boolean;
    telemantenimiento: boolean;
    cocheParticular: boolean;
    hiddenIP: string;
    createdby: string;
    type?: TypeReport;
    servAditional: boolean;
    

    constructor(operator: string, date: NgbDateStruct, company: string, dBegining: TimeCustom, dEnd: TimeCustom,
         notes: string[], km: number, displacements: boolean, parking: number, free:boolean, 
         interno: boolean,telemantenimiento:boolean,cocheParticular:boolean, 
         createdby: string, servAditional: boolean, typec?:TypeReport,uid?: string) {
        
        
        this.uid = uid;
        this.operator = operator;
        this.date = date;
        this.company = company;
        this.dBegining = dBegining;
        this.dEnd = dEnd;
        this.notes = notes;
        this.km = km;
        this.displacements = displacements;
        this.parking = parking;
        this.free = free;
        this.interno = interno;
        this.telemantenimiento = telemantenimiento;
        this.cocheParticular = cocheParticular;
        this.hiddenIP = '';
        this.createdby = createdby;
        this.type = typec;
        this.servAditional = servAditional;
    }
}
