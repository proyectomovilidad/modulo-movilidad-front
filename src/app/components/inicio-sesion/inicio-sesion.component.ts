import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { InicioSesionService } from './../../services/inicio-sesion.service';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  public formularioInicioSesion: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public InicioSesionService: InicioSesionService,

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
  if (resultado.status == true){
    environment.TOKEN = resultado.token
  }
    console.log("resultado", resultado)
    console.log("enviroment", environment.TOKEN)


  }



}
