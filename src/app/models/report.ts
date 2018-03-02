import { Company } from './company';

export class Report {
    uid: string;
    operator: string;
    date: Date;
    company: string;
    dBegining: Date;
    dEnd: Date;
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
    constructor(id: string, opertor: string, date: Date, company: string, dBegining: Date, dEnd: Date,
         notes: string[], km: number, displacements: boolean, parking: number, createdby: string ) {
        this.uid = id;
        this.operator = this.operator;
        this.date = date;
        this.company = company;
        this.dBegining = dBegining;
        this.dEnd = dEnd;
        this.notes = notes;
        this.km = km;
        this.displacements = displacements;
        this.parking = parking;
        this.createdby = createdby;
    }
}
