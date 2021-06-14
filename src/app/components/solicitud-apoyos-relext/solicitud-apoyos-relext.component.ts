import { Component, OnInit } from '@angular/core';
import {SolicitudApoyoService} from '../../services/solicitud-apoyo.service';
import {InscripcionEstudianteService} from '../../services/inscripcion-estudiante.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

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
              private route: ActivatedRoute,) { }

  public estudiantes: any = [];

  ngOnInit(): void {
    this.aspuisPersonalService.getAllAspUisPersonal().then(resp => {
      if (resp.status === true) {
        this.estudiantes = resp.data;
      }
    })
  }

  public verSolicitudes(documento_id: any){
    this.router.navigateByUrl(`/solicitud-apoyos-est?documento_id=${documento_id}`);
  }

}
