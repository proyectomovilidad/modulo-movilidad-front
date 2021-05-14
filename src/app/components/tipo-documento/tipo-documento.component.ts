import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoDocumentoService } from './../../services/tipo-documento.service';
import { ConveniosService } from '../../services/convenios.service';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.css']
})
export class TipoDocumentoComponent implements OnInit {

  public formularioCrearDocumento: FormGroup;
  public formCrearTipoDocumentoConvenio: FormGroup;
  public documentos: any;
  public convenios: any;

  constructor(private formBuilder: FormBuilder,private router: Router,
    public conveniosService: ConveniosService,
    public TipoDocumentoService: TipoDocumentoService)
  { 
    this.formularioCrearDocumento = this.formBuilder.group({
      nombre_documento: ['', Validators.required],
      estado_documento: ['', Validators.required]
    });

    this.formCrearTipoDocumentoConvenio = this.formBuilder.group({
      tp_documento_id: ['', Validators.required],
      convenio_id: ['', Validators.required],     
    });

    
  }

  ngOnInit(){    
    this.getDocumentos()
    this.conveniosService.getAllConvenios().then(resp=>{
      this.convenios = resp;
    })
  }

  public editarDocumento(id: any) {
    this.router.navigateByUrl('/editar-documento?_id=' + id);
  }

  public getDocumentos(){
    this.TipoDocumentoService.getDocumentoByConsulta({}).then(resp=>{      
      if(resp.status){
        this.documentos = resp.data;
      }
        console.log('documentos: ',resp)        
    });
  }

  getNoValido(input: string) {
    return this.formularioCrearDocumento.get(input).invalid &&
      this.formularioCrearDocumento.get(input).touched;
  }

  getNoValidoTpDoc(input: string) {
    return this.formCrearTipoDocumentoConvenio.get(input).invalid &&
      this.formCrearTipoDocumentoConvenio.get(input).touched;
  }

  async guardarFormulario() {
    if (this.formularioCrearDocumento.invalid) {
      return Object.values(this.formularioCrearDocumento.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const crearDocumento = this.formularioCrearDocumento.value;

    const tipoDocumento = {
      nombre_documento: crearDocumento.nombre_documento,
      estado_documento: crearDocumento.estado_documento,
      convenioId: crearDocumento.convenio_id
    }

    this.TipoDocumentoService.saveTipoDocumento(tipoDocumento).then(resp=>{
      if(resp.status){
        this.getDocumentos()
      }
    });

    
    this.formularioCrearDocumento.reset();
  }

  guardarFormularioTipoDocumentoConvenio(){
    if (this.formCrearTipoDocumentoConvenio.invalid) {
      return Object.values(this.formCrearTipoDocumentoConvenio.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const DocumentoConvenio = this.formCrearTipoDocumentoConvenio.value;

    const dataTipoDocumento = {
      documento_id: DocumentoConvenio.tp_documento_id,
      convenio_id: DocumentoConvenio.convenio_id
    }

    let documentoGuardado = {};
    this.TipoDocumentoService.saveTipoDocumentoConvenio(dataTipoDocumento).then(resp=>{
      if(resp.status){
        documentoGuardado = resp.data
        this.getDocumentos()
      }
    });
    
    this.formCrearTipoDocumentoConvenio.reset();
  }

  findConvenio(convenios, id){
    return convenios.find(x=> x._id == id)
  }

  eliminarTipoDocumentoConvenio(id){
    this.TipoDocumentoService.removeTipoDocumentoConvenio(id).then(resp=>{
      if(resp.status){
        this.getDocumentos()
      }
      console.log(resp)      
    })
  }
  
}
