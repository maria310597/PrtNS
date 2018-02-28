import { Component, OnInit } from '@angular/core';

@Component({
<<<<<<< HEAD:src/app/prueba.component.ts
  template: `
  <app-navbar></app-navbar>
  <h1> hola </h1>



  `
=======
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
>>>>>>> 5630bf77002b33c95e2423e60e5b15a393aa09ee:src/app/ui/prueba/prueba.component.ts
})
export class PruebaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
