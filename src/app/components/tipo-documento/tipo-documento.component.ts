import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoDocumentoService } from './../../services/tipo-documento.service';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.css']
})
export class TipoDocumentoComponent implements OnInit {

  public formularioCrearDocumento: FormGroup;


  constructor(private formBuilder: FormBuilder,
   public TipoDocumentoService: TipoDocumentoService) { 

    this.formularioCrearDocumento = this.formBuilder.group({
      nombre_documento: ['', Validators.required],
      estado_documento: ['', Validators.required],

  });
}

  ngOnInit(): void {
  }

  getNoValido(input: string) {
    return this.formularioCrearDocumento.get(input).invalid &&
      this.formularioCrearDocumento.get(input).touched;
  }

  async guardarFormulario() {
    if (this.formularioCrearDocumento.invalid) {
      return Object.values(this.formularioCrearDocumento.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const crearDocumento = this.formularioCrearDocumento.value;
    console.log(crearDocumento)

    const tipoDocumento = {
      nombre_documento: crearDocumento.nombre_documento,
      estado_documento: crearDocumento.estado_documento
    }

    const documentoGuardado = await this.TipoDocumentoService.saveTipoDocumento(tipoDocumento);
    console.log(documentoGuardado);

    
    this.formularioCrearDocumento.reset();
  }
  
}
