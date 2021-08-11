import { Component, OnInit } from '@angular/core';
import { ConveniosService } from '../../services/convenios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaisesService } from '../../services/paises.service';
import { ProgramasService } from '../../services/programas.service';
import { TipoConvenioService } from '../../services/tipo-convenio.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-visualizar-convenio',
  templateUrl: './visualizar-convenio.component.html',
  styleUrls: ['./visualizar-convenio.component.css']
})
export class VisualizarConvenioComponent implements OnInit {

  public convenio: any = {convenio:{}, InstitucionCooperante: {},TipoMovilidad:{}};
  public paises: Array<any>=[] ;
  private programasAcad: Array<any> = [];
  private tiposCovenio: Array<any> = [];

  constructor(private conveniosService: ConveniosService,
              private route: ActivatedRoute,
              private paisesService: PaisesService,
              private programasService: ProgramasService,
              private tipoConvenioService: TipoConvenioService,
              private router: Router,
              private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  	this.paisesService.getPais().then(resp=>{this.paises = resp})
  	this.tipoConvenioService.getTipoConvenio().then(resp=> this.tiposCovenio = resp)
  	this.programasService.getProgramaAcademico().then(resp=> this.programasAcad = resp)

  	this.conveniosService.consultarConvenios({'convenio._id': this.route.snapshot.queryParams._id}).then(resp=>{
  		this.convenio = resp[0]
  		console.log(resp[0])
  	})
  }

  public getPais(id){
  	return this.paises.find(x=> x._id == id) || {}
  }

  getPrograma(id){
  	return this.programasAcad.find(x=> x._id == id) || {}
  }

  getConvenio(id){
  	return this.tiposCovenio.find(x=> x._id == id) || {}
  }

  volver(){
    this.router.navigateByUrl('/convenios');
  }
}
