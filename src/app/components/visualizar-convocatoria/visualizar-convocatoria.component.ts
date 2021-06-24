import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ConvocatoriaService} from '../../services/convocatoria.service'
import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
import {environment} from '../../../environments/environment';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-visualizar-convocatoria',
  templateUrl: './visualizar-convocatoria.component.html',
  styleUrls: ['./visualizar-convocatoria.component.css']
})
export class VisualizarConvocatoriaComponent implements OnInit {
  public convocatoria: any = {};
  public instituciones: Array<any> = [];

  constructor(private convocatoriaService: ConvocatoriaService, private route: ActivatedRoute,
  	          public InstitucionCooperanteService: InstitucionCooperanteService,
              private router: Router,
              private dialog: MatDialog,
  ) { }

  async ngOnInit() {
    const user = environment.user;

    if( !this.route.snapshot.data['roles'].includes(user.rol)){
      this.router.navigateByUrl(environment.unauthorizedPage);
      this.dialog.open(CustomDialogComponent, { data: { code: 403}});
    }
    this.convocatoria = await this.convocatoriaService.getConvocatoriaById(this.route.snapshot.queryParams._id);
    this.convocatoria = this.convocatoria[0]
    this.instituciones = await this.InstitucionCooperanteService.getInstitucionCooperante()
  }


  getInstitucion(id){
  	return this.instituciones.find(x=> x._id == id) || {}
  }

  volver(){
    this.router.navigateByUrl('/convocatoria');
  }
}
