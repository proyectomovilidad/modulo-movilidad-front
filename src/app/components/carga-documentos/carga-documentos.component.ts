import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-carga-documentos',
  templateUrl: './carga-documentos.component.html',
  styleUrls: ['./carga-documentos.component.css']
})
export class CargaDocumentosComponent implements OnInit {

  public formularioDocumentos: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    
    this.crearCampo(); 
  
  }

  ngOnInit(): void {
  }

  get campo() {
    return this.formularioDocumentos.get('campo') as FormArray;
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
 
