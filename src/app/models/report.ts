import { Company } from './company';

export class Report {
    id: number;
    operator: string;
    date: Date;
    company: Company;
    dBegining: Date;
    dEnd: Date;
    notes: String[5];
    km: number;
    displacements: boolean;
    parking: number;
    createdby: string;
    constructor(id: number, opertor: string, date: Date, company: Company, dBegining: Date, dEnd: Date,
         notes: String[5], km: number, displacements: boolean, parking: number, createdby: string ) {
        this.id = id;
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
