export class Reserva {
    uid?: string;
    by: string;
    motivo: string;
    solicitud: Date;
    solicitudEnd: Date;
    constructor(by: string, motivo: string, solicitud: Date, solicitudEnd: Date, uid?: string) {
        this.by = by;
        this.motivo = motivo;
        this.solicitud = solicitud;
        this.solicitudEnd = solicitudEnd;
        this.uid = uid;
    }
}
