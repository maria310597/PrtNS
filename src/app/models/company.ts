export class Company {
    uid?: string;
    name: string;
    email: string;
    billMail: string;
    faxNumber: string;
    tlf: string;
    lastmovement: Date;
    igualada: boolean;
    suspendida: boolean;

    constructor( name: string, email: string, lastmovement: Date, igualada: boolean, 
        billMail: string, faxNumber: string, tlf: string,suspendida: boolean,uid?:string) {
        this.name = name;
        this.email = email;
        this.billMail = billMail;
        this.faxNumber = faxNumber;
        this.tlf = tlf;
        this.igualada = igualada;
        this.lastmovement = lastmovement;
        this.uid = uid;
        this.suspendida = suspendida;
        
    }
}
