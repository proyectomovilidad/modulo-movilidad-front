import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(     private router: Router,
                   public dialog: MatDialog
     ) { }

  ngOnInit(): void {
    console.log(new Date());
    // this.dialog.open(CustomDialogComponent, { data: {title: 'ejemplo', message: 'probando esto!', type: 'alert'}});
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
