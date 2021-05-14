import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GuardadoExitosoComponent } from './../guardado-exitoso/guardado-exitoso.component';

@Component({
  selector: 'app-crear-tipo-documento',
  templateUrl: './crear-tipo-documento.component.html',
  styleUrls: ['./crear-tipo-documento.component.css']
})
export class CrearTipoDocumentoComponent implements OnInit {
  convenio_id: String = '';

  public formularioTpDocumento: FormGroup;
  constructor(private formBuilder: FormBuilder, 
               public dialog: MatDialog) { 

    this.formularioTpDocumento = this.formBuilder.group({            
      nombre_documento: this.formBuilder.array([])
    });

  }

  openDialog() {
    this.dialog.open(GuardadoExitosoComponent);
  }

  ngOnInit(): void {
  }

  getNoValido(input: string) {
    return this.formularioTpDocumento.get(input).invalid && 
    this.formularioTpDocumento.get(input).touched;
  }

  guardarFormulario() {
    if (this.formularioTpDocumento.invalid) {
      return Object.values(this.formularioTpDocumento.controls).forEach(control => {
        control.markAsTouched();        
      });   
    }

    console.log('formulario: ', this.formularioTpDocumento.value)
    const data = []
    this.formularioTpDocumento.value.nombre_documento.forEach(element=>{
    	data.push({nombre_documento: element, convenio_id: this.convenio_id})
    })

    this.formularioTpDocumento.reset();
  }
  
  get campo() {
    return this.formularioTpDocumento.get('nombre_documento') as FormArray;
  }

  agregarCampo() {
    this.campo.push(this.formBuilder.control('', Validators.required) ); 
  }

}
