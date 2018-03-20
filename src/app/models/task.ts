import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { TimeCustom } from "./Time";

import { Status } from "./status";

export class Task {
    uid?: string;
    createdby: string;
    date: NgbDateStruct;
    time: TimeCustom;
    description: string;
    status: Status;

    constructor(c:string,sta:Status,d:NgbDateStruct,t:TimeCustom,des:string,u?:string) {
        this.uid = u;
        this.createdby = c;
        this.date = d;
        this.time = t;
        this.status = sta;
        this.description = des;
    }

}