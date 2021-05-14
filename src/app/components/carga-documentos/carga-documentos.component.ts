import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { InscripcionEstudianteService } from 'src/app/services/inscripcion-estudiante.service';
import { TipoDocumentoService } from './../../services/tipo-documento.service';
import { CargaDocumentoService } from './../../services/carga-documento.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-carga-documentos',
  templateUrl: './carga-documentos.component.html',
  styleUrls: ['./carga-documentos.component.css']
})
export class CargaDocumentosComponent implements OnInit {

  public formularioDocumentos: FormGroup;
  public estudiantes: any;
  public documentos: any;
  public estudiante: any;
  file: File;
  mensajeErr: any;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private inscripcionEstudianteService: InscripcionEstudianteService,
              private TipoDocumentoService: TipoDocumentoService,
              private CargaDocumentoService: CargaDocumentoService) {
    
    this.crearCampo(); 
  
  }  

  async ngOnInit(): Promise<void> {
    if(environment.user.Inscripcion.estado != '2'){
      //this.router.navigateByUrl('/');      
    }

    this.estudiante = environment.user
    this.inscripcionEstudianteService.getAllAspUisPersonal().then(resp=>{
      if(resp.status){
        //this.estudiante = resp.data
        this.getDocumentos()
      }
    });
    //this.documentos = await this.TipoDocumentoService.getDocumento();
  }
 
  get campo() {
    return this.formularioDocumentos.get('campo') as FormArray;
  }

  public cargarDatos(id: any) {   
  }

  getDocumentos(){
    console.log('url: ',this.estudiante)
    this.TipoDocumentoService.getDocumentoByConvenio(this.estudiante.Inscripcion.nombre_convenio).then(resp=>{
      console.log('respuesta: ', resp)
      if(resp.status)this.documentos = resp.data;
    });
  }
  
  saveFile(e, indid, tipoDocumentoId){
    let formData = new FormData()
    this.file = e.target.files[0]

    let extension = this.file.name.split('.').pop()

    if(['pdf', 'PDF'].includes(extension) ){
      //se agrega el archivo subido a un formulario 
      //              |campo| |archivo|  |nombre de archivo|
      formData.append('file', this.file, `${this.estudiante.Inscripcion._id}-${tipoDocumentoId}.${extension}` )
      
      this.CargaDocumentoService.saveDocumentoFile(formData).then(res=>{
        console.log(res)
      })
      this.mensajeErr = '' 
    }else{
      this.mensajeErr = "seleccione un archivo valido"
      console.log("archivo no es valido")
    }

  }

    
  crearCampo(){ 
    this.formularioDocumentos = this.formBuilder.group ({

      campo: this.formBuilder.array([
      ])   
    });
  } 
  

  agregarCampo() {
    this.campo.push(this.formBuilder.control('', Validators.required) ); 
  }

  eliminarDocumento(inscripcionId, tipoDocumentoId){
    const fileName = `${this.estudiante.Inscripcion._id}-${tipoDocumentoId}.pdf`
    this.CargaDocumentoService.eliminarDocumentoByNombre(fileName).then(resp=>{
      console.log(resp)
    })
  }

  eliminarCampo( i : number) {

    this.campo.removeAt(i);
      
  }
  
 
 


}
 
