import { Component, OnInit } from '@angular/core';
import {SolicitudApoyoService} from '../../services/solicitud-apoyo.service';
import {InscripcionEstudianteService} from '../../services/inscripcion-estudiante.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-solicitud-apoyos-relext',
  templateUrl: './solicitud-apoyos-relext.component.html',
  styleUrls: ['./solicitud-apoyos-relext.component.css']
})
export class SolicitudApoyosRelextComponent implements OnInit {

  constructor(private solicitudApoyoService: SolicitudApoyoService,
              private aspuisPersonalService: InscripcionEstudianteService,
              private router: Router,
              private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
  ) {
    this.formConsulta = this.formBuilder.group({
      codigo_est: [],
      documento_id: []
    });
  }

  public estudiantes: any = [];
  public formConsulta: FormGroup;


  ngOnInit(): void {
    this.obtenerDatos();
  }

  public verSolicitudes(documento_id: any){
    this.router.navigateByUrl(`/solicitud-apoyos-est?documento_id=${documento_id}`);
  }

  public async consultar() {
    if (this.formConsulta.invalid) {
      return Object.values(this.formConsulta.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const datosConsulta = this.formConsulta.value;

    let consulta = {
      "aspUisPersonal.codigo_est": datosConsulta.codigo_est,
      "aspUisPersonal.documento_id": datosConsulta.documento_id
    }

    console.log('consulta: ', consulta)
    this.estudiantes = await this.aspuisPersonalService.consultarEstudiantes(consulta);
    console.log('resultado: ', this.estudiantes);

  }

  public async cancelarConsulta() {
    this.formConsulta.reset();
    await this.obtenerDatos();
  }

  private async obtenerDatos() {
    this.estudiantes = await this.aspuisPersonalService.consultarEstudiantes({});
  }
}
