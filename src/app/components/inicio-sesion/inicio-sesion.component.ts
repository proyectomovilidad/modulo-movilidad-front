import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { InicioSesionService } from './../../services/inicio-sesion.service';
import { environment } from 'src/environments/environment';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';
import {MatDialog} from '@angular/material/dialog';




@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  public formularioInicioSesion: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              public InicioSesionService: InicioSesionService,
              private dialog: MatDialog,
  ) {
    this.formularioInicioSesion = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      contrasena: ['', Validators.required],
      rol: ['', Validators.required]

    });
    }

  ngOnInit(): void {
  }

  async inicioSesion() {
    if (this.formularioInicioSesion.invalid) {
      return Object.values(this.formularioInicioSesion.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const datosInicioSesion = this.formularioInicioSesion.value;


    let resultado = await this.InicioSesionService.iniciarSesion(datosInicioSesion)
    console.log('inicio sesion: ',resultado);
    let message = '';

    if (resultado.status === true){
      localStorage.setItem('token', resultado.token)
      localStorage.setItem('user', JSON.stringify(resultado.usuario))
      environment.TOKEN = resultado.token
      environment.user = resultado.usuario
      this.router.navigateByUrl('/')
      message = 'Ingreso correctamente.'
    }else{ message = resultado.message}

    this.dialog.open(CustomDialogComponent, { data: { title: 'SESION', message: message}});
  }

  cerrarSesion(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}
