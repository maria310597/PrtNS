export class User {
    realname: String;
    nickname: String;
    email: String;
    phone: String;
    password: String;
    // Notificaciones?

    constructor(realname: String, nickname: String, email: String, phone: String, password: String ) {
        this.realname = realname;
        this.nickname = nickname;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }

}
