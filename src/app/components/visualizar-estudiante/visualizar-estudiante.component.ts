import { Component, OnInit } from '@angular/core';
import { InscripcionEstudianteService } from 'src/app/services/inscripcion-estudiante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaisesService } from './../../services/paises.service';
import { DepartamentosService } from './../../services/departamentos.service';
import { CiudadesService } from './../../services/ciudades.service';
import { ProgramasService } from '../../services/programas.service';
import { TiposDocumentosIdService } from './../../services/tipos-documentos-id.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-visualizar-estudiante',
  templateUrl: './visualizar-estudiante.component.html',
  styleUrls: ['./visualizar-estudiante.component.css']
})
export class VisualizarEstudianteComponent implements OnInit {

  estudiante: any=[];
  paises: any=[];
  departamentos: any=[];
  ciudades: Array<any>=[];
  documentos: any=[];
  programaAcad:any = [];

  constructor(    public PaisesService: PaisesService,
    public DepartamentosService: DepartamentosService,
    private tiposDocumentosIdService: TiposDocumentosIdService,
    public CiudadesService: CiudadesService,
    private inscripcionEstudianteService: InscripcionEstudianteService,
    private route: ActivatedRoute,
    private router: Router,
    private programasServices: ProgramasService,
                  private dialog: MatDialog,
   ) { }

  async ngOnInit() {
    this.documentos = await this.tiposDocumentosIdService.getTipoDocumentoId();
    this.programaAcad = await this.programasServices.getProgramaAcademico();
  	this.CiudadesService.getAllCiudades().then(resp=>{
  		if(resp.status)this.ciudades =  resp.data
  	});
  	 this.DepartamentosService.getAllDepartamentos().then(resp=>{
  		if(resp.status)this.departamentos = resp.data
  	});
  	this.paises = await this.PaisesService.getPais();

    let estudianteR:any = await this.inscripcionEstudianteService.consultarEstudiantes({'aspUisPersonal._id': this.route.snapshot.queryParams._id})
    estudianteR = estudianteR[0]

    this.estudiante.push(['_id', estudianteR._id],['DATOS PERSONAL',''])
    Object.entries(estudianteR.aspUisPersonal).forEach(element=>{this.pushData(element)})

    this.estudiante.push(['DATOS ACADEMICOS',''])
    Object.entries(estudianteR.aspUisAcademic).forEach(element=>{this.pushData(element)})

    this.estudiante.push(['DATOS INSTITUCION',''])
    Object.entries(estudianteR.InstitucionCooperante).forEach(element=>{this.pushData(element)})

    this.estudiante.push(['DATOS MOVILIDAD',''])
    Object.entries(estudianteR.TipoMovilidad).forEach(element=>{this.pushData(element)})

    this.estudiante.push(['DATOS INSCRIPCION',''])
    Object.entries(estudianteR.Inscripcion).forEach(element=>{
      // en el array va el nombre de los campos que no se quieran incluir
      if(!['nombre_institucion','tipo_movilidad','nombre_convenio'].includes(element[0])){
        this.pushData(element)
      }
    })
    console.log(this.estudiante)
    console.log(estudianteR)
  }

  pushData(elm){
  	if(elm[0] == '_id')return false;
  	if(['pais','ciudad','departamento','pais_nacimiento', 'tipo_doc_id', 'programa_acad'].includes(elm[0])){
  		console.log(elm)
  		let v = eval(`this.get${elm[0]}('${elm[1]}')`)
  		this.estudiante.push([elm[0], v])
  	}else{
  		this.estudiante.push(elm)
  	}
  }

  getpais(id){
  	const result = this.paises.find(x=> x.codigo_pais==id)
    return result ? result.nombre_pais : ''
  }

  getpais_nacimiento(id){
    const result = this.paises.find(x=> x.codigo_pais==id)
    return result ? result.nombre_pais : ''
  }

  getdepartamento(id){
  	const result = this.departamentos.find(x=> x.codigo_departamento==id)
  	return result ? result.nombre_departamento : ''
  }

  getciudad(id){
  	const result = this.ciudades.find(x=> x._id==id)

  	return result ? result.nombre_ciudad : ''
  }

  getprograma_acad(id){
    const result = this.programaAcad.find(x=> x._id==id)

    return result ? result.nombre_programaAcademico : ''
  }

  gettipo_doc_id(id){
    const result = this.documentos.find(x=> x._id==id)

    return result ? result.nombre_documentoId : ''
  }

  volver(){
  	this.router.navigateByUrl('/estudiantes-movilidad');
  }


}
