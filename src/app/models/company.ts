import { NgbTimepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class Company {
    uid?: string;
    name: string;
    email: string;
    billMail: string;
    faxNumber: string;
    tlf: string;
    lastmovement: NgbDateStruct;
    igualada: boolean;
    suspendida: boolean;
    igualahours: number;
    nif:string;
    address: string;

    constructor( nif:string, address:string,igualahours:number, name: string, email: string, lastmovement: NgbDateStruct, igualada: boolean, 
        billMail: string, faxNumber: string, tlf: string,suspendida: boolean,uid?:string) {
        
            this.nif = nif;
            this.address = address;
            this.name = name;
        this.email = email;
        this.billMail = billMail;
        this.faxNumber = faxNumber;
        this.tlf = tlf;
        this.igualada = igualada;
        this.lastmovement = lastmovement;
        this.uid = uid;
        this.suspendida = suspendida;
        this.igualahours = igualahours;
    }
}
