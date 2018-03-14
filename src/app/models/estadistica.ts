import { User } from "./user";

export class Estadistica {
    user: User;
    estad: Map<string, number>;

    constructor(user: User, estad: Map<string, number>) {
        this.user = user;
        this.estad = estad;
    }
  }
  
