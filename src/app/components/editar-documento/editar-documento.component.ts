import { Component, OnInit } from '@angular/core';
import { TipoDocumentoService } from './../../services/tipo-documento.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-editar-documento',
  templateUrl: './editar-documento.component.html',
  styleUrls: ['./editar-documento.component.css']
})
export class EditarDocumentoComponent implements OnInit {

  public formularioCrearDocumento: FormGroup;
  public documentos: any;
  
  constructor(private formBuilder: FormBuilder,
    private router: Router,
   public TipoDocumentoService: TipoDocumentoService) {

    this.formularioCrearDocumento = this.formBuilder.group({
      nombre_documento: ['', Validators.required],
      estado_documento: ['', Validators.required],

  });
    }

    async ngOnInit(): Promise<void> {
      this.documentos = await this.TipoDocumentoService.getDocumento();
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
