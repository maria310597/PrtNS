export class Frase {
    uid? : string;
    frase: string;
    autor: string;

    constructor(desc: string, autor: string,uid?:string){
        this.frase = desc;
        this.autor = autor;
        this.uid = uid;
    }
}