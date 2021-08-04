import { Component, OnInit } from '@angular/core';
import { InscripcionExternoService } from './../../services/inscripcion-externo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaisesService } from './../../services/paises.service';
import { DepartamentosService } from './../../services/departamentos.service';
import { CiudadesService } from './../../services/ciudades.service';
import { TiposDocumentosIdService } from './../../services/tipos-documentos-id.service';
import { ProgramasService } from '../../services/programas.service';
import {environment} from '../../../environments/environment';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-visualizar-externo',
  templateUrl: './visualizar-externo.component.html',
  styleUrls: ['./visualizar-externo.component.css']
})
export class VisualizarExternoComponent implements OnInit {
  externo: any = [];

  constructor(private inscripcionExternoService: InscripcionExternoService, private route: ActivatedRoute, private router: Router,
              public PaisesService: PaisesService,
              public tiposDocumentosIdService: TiposDocumentosIdService,
              public DepartamentosService: DepartamentosService,
              public CiudadesService: CiudadesService,
              private programasServices: ProgramasService,
              private dialog: MatDialog,
  ) { }

  paises: any = [];
  departamentos: any = [];
  ciudades: Array<any> = [];
  documentos: any = [];
  programaAcad: any = [];

  async ngOnInit() {
    console.log('token: ', this.route.snapshot.queryParams._id);

    this.CiudadesService.getAllCiudades().then(resp => {
      if (resp.status){ this.ciudades =  resp.data; }
    });

    this.DepartamentosService.getAllDepartamentos().then((resp) => {
      if (resp.status) {this.departamentos = resp.data; }
    });

    this.paises = await this.PaisesService.getPais();
    this.documentos = await this.tiposDocumentosIdService.getTipoDocumentoId();
    this.programaAcad = await this.programasServices.getProgramaAcademico();

    let externoR: any = await this.inscripcionExternoService.consultarExternos({'aspExtPersonal._id': this.route.snapshot.queryParams._id});

    externoR = externoR[0];

    this.externo.push(['_id', externoR._id], ['DATOS PERSONAL', '']);
    Object.entries(externoR.aspExtPersonal).forEach(element => {this.pushData(element); });

    this.externo.push(['DATOS ACADEMICOS', '']);
    Object.entries(externoR.aspExtAcademic).forEach(element => {this.pushData(element); });

    this.externo.push(['DATOS INSTITUCION', '']);
    Object.entries(externoR.InstitucionCooperante).forEach(element => {this.pushData(element); });
    console.log(externoR);

    this.externo.push(['DATOS MOVILIDAD', '']);
    Object.entries(externoR.TipoMovilidad).forEach(element => {this.pushData(element); });

    this.externo.push(['DATOS INSCRIPCION', '']);
    Object.entries(externoR.Inscripcion).forEach(element => {this.pushData(element); });
  }


  pushData(elm){
    if (elm[0] === '_id') {return false; }

    const ext = ['pais', 'ciudad', 'departamento', 'pais_res',
     'pais_nacimiento', 'prog_acad_uis', 'tipo_doc_id'];

    if (ext.includes(elm[0])){
      const v = eval(`this.get${elm[0]}('${elm[1]}')`);
      this.externo.push([elm[0], v]);
    }else{
      this.externo.push(elm);
    }
  }

  getpais(id){
    const result = this.paises.find(x => x.codigo_pais == id);
    return result ? result.nombre_pais : '';
  }

  getpais_res(id){
    const result = this.paises.find(x => x.codigo_pais == id);
    return result ? result.nombre_pais : '';
  }

  getpais_nacimiento(id){
    const result = this.paises.find(x => x.codigo_pais == id);
    return result ? result.nombre_pais : '';
  }

  getdepartamento(id){
  	const result = this.departamentos.find(x => x.codigo_departamento == id);
  	return result ? result.nombre_departamento : '';
  }

  getciudad(id){
  	const result = this.ciudades.find(x => x._id == id);
  	return result ? result.nombre_ciudad : '';
  }

  gettipo_doc_id(id){
    const result = this.documentos.find(x => x._id == id);

    return result ? result.nombre_documentoId : '';
  }

  getprog_acad_uis(id){
    const result = this.programaAcad.find(x => x._id == id);

    return result ? result.nombre_programaAcademico : '';
  }

  volver(){
  	this.router.navigateByUrl('/externos-movilidad');
  }

}
