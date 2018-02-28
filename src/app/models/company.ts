export class Company {
    name: string; //Clave primaria
    email: string;
    billMail: string;
    faxNumber: string;
    tlf: string;
    lastmovement: Date;
    igualada: boolean;

    constructor(name: string, email: string, lastmovement: Date, igualada: boolean, billMail: string, faxNumber: string, tlf: string) {
        this.name = name;
        this.email = email;
        this.billMail = billMail;
        this.faxNumber = faxNumber;
        this.tlf = tlf;
        this.igualada = igualada;
        this.lastmovement = lastmovement;

    }
}
