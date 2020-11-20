import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { InscripcionEstudianteService } from 'src/app/services/inscripcion-estudiante.service';
import { TipoDocumentoService } from './../../services/tipo-documento.service';

@Component({
  selector: 'app-carga-documentos',
  templateUrl: './carga-documentos.component.html',
  styleUrls: ['./carga-documentos.component.css']
})
export class CargaDocumentosComponent implements OnInit {

  public formularioDocumentos: FormGroup;
  public estudiantes: any;
  public documentos: any;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private inscripcionEstudianteService: InscripcionEstudianteService,
              private TipoDocumentoService: TipoDocumentoService) {
    
    this.crearCampo(); 
  
  }  

  async ngOnInit(): Promise<void> {
    this.estudiantes = await this.inscripcionEstudianteService.getAllAspUisPersonal();
    this.documentos = await this.TipoDocumentoService.getDocumento();
  }
 
  get campo() {
    return this.formularioDocumentos.get('campo') as FormArray;
  }

public caragarDatos(id: any) {
this.router.navigateByUrl('/inscripcion-estudiante?_id=' + id);
    
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

  eliminarCampo( i : number) {

    this.campo.removeAt(i);
      
  }
  
 
 


}
 
