export class User {
    realname: string;
    nickname: string;
    email: string;
    phone: string;
    password: string;
    // Notificaciones?

    constructor(realname: string, nickname: string, email: string, phone: string, password: string )  {
        this.realname = realname;
        this.nickname = nickname;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }

}
