export class User {
    uid?: string;
    realname: string;
    nickname: string;
    email: string;
    phone: string;
    imagen: string;
    admin: boolean;
    password?: string;

    // tslint:disable-next-line:max-line-length
    constructor(realname: string, nickname: string, email: string, phone: string, imagen: string, admin: boolean, password?: string, uid?: string) {
      this.uid = uid;
      this.realname = realname;
      this.nickname = nickname;
      this.email = email;
      this.phone = phone;
      this.imagen = imagen;
      this.admin = admin;
      this.password = password;
    }
  }
