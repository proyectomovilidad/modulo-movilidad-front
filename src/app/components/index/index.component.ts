import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(     private router: Router,
     ) { }

  ngOnInit(): void {
    console.log(new Date())
  }

  public movilidadentrante() {
    this.router.navigateByUrl('/inscripcion-externo');

  }

  public movilidadsalientente() {
    this.router.navigateByUrl('/inscripcion-estudiante');

  }

  public profesores() {
    this.router.navigateByUrl('/profesores');

  }

  public convenios() {
    this.router.navigateByUrl('/convenios');
  }

  public convocatorias() {
    this.router.navigateByUrl('/convocatoria');

  }


}
