import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-incripcion-externo',
  templateUrl: './incripcion-externo.component.html',
  styleUrls: ['./incripcion-externo.component.css']
})
export class IncripcionExternoComponent implements OnInit {

  public formularioInscripcionExterno: FormGroup;
  constructor(private formBuilder: FormBuilder) { 

      this.formularioInscripcionExterno = this.formBuilder.group({
        
        tipo_doc_id: ['', Validators.required],
        documento_id: [0, Validators.required],
        primer_nombre: ['', Validators.required],
        primer_apellido: ['', Validators.required],
        genero: ['', Validators.required],
        sede: ['', Validators.required],
        programa_acad: ['', Validators.required],
        prog_acad_uis: ['', Validators.required],
        fecha_nacimiento: [Date, Validators.required],
        pais_nacimiento: ['', Validators.required],
        pais_res: ['', Validators.required],
        departamento: ['', Validators.required],
        ciudad: ['', Validators.required],
        direccion: ['', Validators.required],
        semestre: ['', Validators.required],
        promedio: ['', Validators.required],
        cred_cursados: [0, Validators.required],
        cred_cursar: [0, Validators.required],
        periodo_inscrip: ['', Validators.required],
        ano_inscrip: ['', Validators.required],
        celular: [0, Validators.required],
        correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],
        tipo_movilidad: ['', Validators.required],
        nombre_institucion: ['', Validators.required]
        

      });
  
    }

  ngOnInit(): void {
  }

 
  getNoValido(input: string) {
    return this.formularioInscripcionExterno.get(input).invalid && 
    this.formularioInscripcionExterno.get(input).touched;
  }

  guardarFormulario() {

    if (this.formularioInscripcionExterno.invalid) {

      return Object.values(this.formularioInscripcionExterno.controls).forEach(control => {

        control.markAsTouched();
        
      });

    
    }

    this.formularioInscripcionExterno.reset();
  }

}
