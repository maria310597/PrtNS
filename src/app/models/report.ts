import { User } from './user';
import { Company } from './company';

export class Report {
    id: number;
    operator: User;
    date: Date;
    company: Company;
    dBegining: Date;
    dEnd: Date;
    notes: String[5];
    km: number;
    displacements: number;
    parking: number;
    constructor(id: number, opertor: User, date: Date, company: Company, dBegining: Date, dEnd: Date,
         notes: String[5], km: number, displacements: number, parking: number ) {
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
    }
}
