import { Component, OnInit } from '@angular/core';
import { ProfesoresService } from './../../services/profesores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TiposDocumentosIdService } from './../../services/tipos-documentos-id.service';
import { ConvocatoriaService } from '../../services/convocatoria.service'

@Component({
  selector: 'app-visualizar-profesor',
  templateUrl: './visualizar-profesor.component.html',
  styleUrls: ['./visualizar-profesor.component.css']
})
export class VisualizarProfesorComponent implements OnInit {

  profesor: any= [];
  documentos: any=[];
  convocatorias: any=[];

  constructor(private profesoresService: ProfesoresService,
  	private tiposDocumentosIdService: TiposDocumentosIdService,
  	private router: Router,  private route: ActivatedRoute,
  	public convocatoriaService: ConvocatoriaService) { }

  async ngOnInit() {
  	this.documentos = await this.tiposDocumentosIdService.getTipoDocumentoId();
    this.convocatorias = await this.convocatoriaService.getConvocatorias();

    let profesorR:any = await this.profesoresService.getProfesor(this.route.snapshot.queryParams._id)
    profesorR = profesorR[0]

    this.profesor.push(['_id', profesorR._id])
    Object.entries(profesorR).forEach(element=>{this.pushData(element)})
  }

  pushData(elm){
  	if(elm[0] == '_id')return false;
  	if(['nombre_convocatoria', 'tipo_doc_id'].includes(elm[0])){
  		console.log(elm)
  		let v = eval(`this.get${elm[0]}('${elm[1]}')`)
  		this.profesor.push([elm[0], v])
  	}else{
  		this.profesor.push(elm)
  	}
  }

  getnombre_convocatoria(id){
    const result = this.convocatorias.find(x=> x._id==id)
    return result ? result.nombre_convocatoria : '' 
  }

  gettipo_doc_id(id){
  	const result = this.documentos.find(x=> x._id==id)
  	return result ? result.nombre_documentoId : ''
  }

  volver(){
  	this.router.navigateByUrl('/profesores-movilidad')
  }

}
