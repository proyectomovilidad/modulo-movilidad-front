import { Component, OnInit } from '@angular/core';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { ConvocatoriaService} from '../../services/convocatoria.service'
import {InstitucionCooperanteService} from '../../services/institucion-cooperante.service';
import {TipoProyectoService} from '../../services/tipo-proyecto.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-editar-convocatoria',
  templateUrl: './editar-convocatoria.component.html',
  styleUrls: ['./editar-convocatoria.component.css']
})
export class EditarConvocatoriaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              public institucionCooperanteService: InstitucionCooperanteService,
              public convocatoriaService: ConvocatoriaService,
              public tipoProyectoService: TipoProyectoService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
  ) {
    this.formConvocatoria = this.formBuilder.group({
      nombre_convocatoria: ['', Validators.required],
      estado_convocatoria: ['', Validators.required],
      periodo_convocatoria: ['', Validators.required],
      fecha_inicio: [Date, Validators.required],
      fecha_final: [Date, Validators.required],
      fecha_suscripcion: [Date, Validators.required],
      nombre_institucion: ['', Validators.required],
      tipo_proyecto: ['', Validators.required],
      link_inscripcion: ['', Validators.required],
    });
  }

  public convocatoria: any;
  public formConvocatoria: FormGroup;
  public institucionesCooperantes: any = [];
  public tiposProyecto: any = [];
  private id;

  async ngOnInit() {
    this.id = this.route.snapshot.queryParams._id
    const user = environment.user;

    if( !this.route.snapshot.data['roles'].includes(user.role)){
      // this.router.navigateByUrl(environment.unauthorizedPage);
      this.dialog.open(CustomDialogComponent, { data: { code: 403}});
    }
    this.institucionesCooperantes = await this.institucionCooperanteService.getInstitucionCooperante();
    this.tiposProyecto = await this.tipoProyectoService.getTiposProyecto();

    this.convocatoriaService.getConvocatoriaById(this.id).then(resp => {
      console.log('convocatpiaresp ', resp)
      if (resp.length > 0) {
        this.convocatoria = resp[0];
        this.formConvocatoria.setValue(
          {nombre_convocatoria: this.convocatoria.nombre_convocatoria,
          estado_convocatoria: this.convocatoria.estado_convocatoria,
          periodo_convocatoria: this.convocatoria.periodo_convocatoria,
          fecha_inicio: this.convocatoria.fecha_inicio ,
          fecha_final: this.convocatoria.fecha_final ,
          fecha_suscripcion: this.convocatoria.fecha_suscripcion,
          nombre_institucion: this.convocatoria.nombre_institucion,
          tipo_proyecto: this.convocatoria.tipo_proyecto,
          link_inscripcion: this.convocatoria.link_inscripcion})
      }
    });
  }

  actualizar() {
    const data = this.formConvocatoria.value;
    this.convocatoriaService.updateConvocatoria(this.id, data).then(resp => {
      let code  = 211;

      if(resp.status === false){
        console.log(resp)
        code = 212;
      }
      console.log (resp.status)
      this.dialog.open(CustomDialogComponent, { data: { code: code}});
    });

  }

  regresar() {
    this.router.navigateByUrl('/convocatoria');
  }

  getNoValido(control: string) {

  }
}
