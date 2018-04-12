export class Vehicle {
  uid?: string;
  Marca: string;
  nombre: string;

  constructor(Marca: string, nombre: string, uid?: string) {
    this.uid = uid;
    this.Marca = Marca;
    this.nombre = nombre;
  }
}
