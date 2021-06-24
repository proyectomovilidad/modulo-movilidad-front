import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitudApoyoService } from './../../services/solicitud-apoyo.service';
import { TipoApoyoService } from './../../services/tipo-apoyo.service';
import {environment} from '../../../environments/environment';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';




@Component({
  selector: 'app-solicitud-apoyos',
  templateUrl: './solicitud-apoyos.component.html',
  styleUrls: ['./solicitud-apoyos.component.css']
})
export class SolicitudApoyosComponent implements OnInit {

  public tiposApoyo: any;
  public formularioSolicitudApoyos: FormGroup;
  public entidadesFinancieras: any = environment.entidadesFinancieras;
  public tipoCuentas: any = environment.tipoCuentas;
  public estados: any = [{val: 0, nm: 'Solicitado'}, {val: 1, nm: 'En proceso'}, {val: 2, nm: 'Finalizada'}]

  private user: any = environment.user;
  public solicitudes: any = [];

  constructor(private formBuilder: FormBuilder,
              public SolicitudApoyoService: SolicitudApoyoService,
              public TipoApoyoService: TipoApoyoService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
  ) {
      this.formularioSolicitudApoyos = this.formBuilder.group({
        tipo_apoyo: ['', Validators.required],
        entidad_financiera: ['', Validators.required],
        fecha_solicitud: [Date, Validators.required],
        numero_cuenta: [0, Validators.required],
        tipo_cuenta: ['', Validators.required],
      });
  }

  async ngOnInit(): Promise<void> {
    if(this.user.Inscripcion.estado != '2' && !this.route.snapshot.data['roles'].includes(this.user.rol)){
      this.router.navigateByUrl(environment.unauthorizedPage);
      this.dialog.open(CustomDialogComponent, { data: { code: 403}});
    }
    this.TipoApoyoService.getTipoApoyoByEstrato(this.user.estrato).then(resp => {
      if (resp.status === true){
        this.tiposApoyo = resp.data;
      }
    });

    this.getSolicitudes();
  }


  getNoValido(input: string) {
    return this.formularioSolicitudApoyos.get(input).invalid &&
    this.formularioSolicitudApoyos.get(input).touched;
  }

  async guardarFormulario(){
    if (this.formularioSolicitudApoyos.invalid) {
      return Object.values(this.formularioSolicitudApoyos.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    const crearSolicitudApoyos = this.formularioSolicitudApoyos.value;
    console.log(crearSolicitudApoyos)

    const solicitudApoyo = {

      tipo_apoyo:  crearSolicitudApoyos.tipo_apoyo,
      entidad_financiera: crearSolicitudApoyos.entidad_financiera ,
      fecha_solicitud: crearSolicitudApoyos.fecha_solicitud ,
      numero_cuenta: crearSolicitudApoyos.numero_cuenta ,
      tipo_cuenta:crearSolicitudApoyos.tipo_cuenta,
      estudiante: this.user.documento_id
    }

    const solicitudApoyoGuardado = await this.SolicitudApoyoService.saveSolicitudApoyo(solicitudApoyo);

    const code = solicitudApoyoGuardado._id ? 201 : 210;
    this.dialog.open(CustomDialogComponent, { data: { code: code}});
    this.getSolicitudes();

    this.formularioSolicitudApoyos.reset();
  }

  private getSolicitudes(): void {
    const documento_id = this.user.documento_id;

    this.SolicitudApoyoService.getSolicitudesByEstudiante(documento_id).then(resp => {
      if (resp.status === true) {
        this.solicitudes = resp.data;
      }
    });
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


}
