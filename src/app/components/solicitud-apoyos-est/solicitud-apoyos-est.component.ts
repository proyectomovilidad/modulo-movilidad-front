import { Component, OnInit } from '@angular/core';
import {SolicitudApoyoService} from '../../services/solicitud-apoyo.service';
import {InscripcionEstudianteService} from '../../services/inscripcion-estudiante.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-solicitud-apoyos-est',
  templateUrl: './solicitud-apoyos-est.component.html',
  styleUrls: ['./solicitud-apoyos-est.component.css']
})
export class SolicitudApoyosEstComponent implements OnInit {

  constructor(private solicitudApoyoService: SolicitudApoyoService,
              private router: Router,
              private dialog: MatDialog,
              private route: ActivatedRoute,) { }

  public solicitudes: any = [];
  public entidadesFinancieras: any = environment.entidadesFinancieras;
  public tipoCuentas: any = environment.tipoCuentas;
  public estados: any = [{val: 0, nm: 'Solicitado'}, {val: 1, nm: 'En proceso'}, {val: 2, nm: 'Finalizada'}]

  ngOnInit(): void {
    this.getSolicitudes();
  }

  public editarEstado(_id: any, estado: any):void {
    this.solicitudApoyoService.updateSolicitudApoyo(_id, {estado: Number(estado)}).then(resp => {
      let code = 212;
      if (resp.estado !== estado) {
        code = 211;
        this.getSolicitudes();
      }

      this.dialog.open(CustomDialogComponent, { data: { code: code}});
    })
  }

  public eliminar(_id: any): void {
  }

  getEntidad(codigo): string {
    const entidad = this.entidadesFinancieras.find(x => x.codigo === codigo) || {nombre: '-No existe-'}
    return entidad.nombre
  }

  getTipoCuenta(codigo): string {
    const cuenta = this.tipoCuentas.find(x => x.codigo === codigo) || {nombre: '-No existe-'}
    return cuenta.nombre
  }

  getEstado(val): string {
    const estado = this.estados.find(x => x.val === val) || {nm: '-No existe-'}
    return estado.nm
  }

  private getSolicitudes(): void {
    const documento_id = this.route.snapshot.queryParams.documento_id;

    this.solicitudApoyoService.getSolicitudesByEstudiante(documento_id).then(resp => {
      if (resp.status === true) {
        this.solicitudes = resp.data;
      }
    });
  }
}
