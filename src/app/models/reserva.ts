import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";

export class Reserva {
    uid?: string;
    by: string;
    motivo: string;
    solicitud: Date;
   
    timeStart: NgbTimeStruct;
    timeEnd: NgbTimeStruct;

    constructor(by: string, motivo: string, solicitud: Date, timeStart: NgbTimeStruct, timeEnd: NgbTimeStruct, uid?: string) {
        this.by = by;
        this.motivo = motivo;
        this.solicitud = solicitud;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.uid = uid;
    }
}
