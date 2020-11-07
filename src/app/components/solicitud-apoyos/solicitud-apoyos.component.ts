import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-solicitud-apoyos',
  templateUrl: './solicitud-apoyos.component.html',
  styleUrls: ['./solicitud-apoyos.component.css']
})
export class SolicitudApoyosComponent implements OnInit {

  public formularioSolicitudApoyos: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar) { 
      
      this.formularioSolicitudApoyos = this.formBuilder.group({
        
        entidad_financiera: ['', Validators.required],
        fecha_solicitud: [Date, Validators.required],
        estrato: ['', Validators.required],
        numero_cuenta: [0, Validators.required],
        tipo_cuenta: ['', Validators.required],
        
        

    }); }

  ngOnInit(): void {
  }

  
  getNoValido(input: string) {
    return this.formularioSolicitudApoyos.get(input).invalid && 
    this.formularioSolicitudApoyos.get(input).touched;
  }

  guardarFormulario(){
    this.validarFormulario();
    if (this.formularioSolicitudApoyos.invalid) {
      this.matSnackBar.open('Error', 'Llenar campos obligatorios');
      return;
    }
    const solicitudApoyos = this.formularioSolicitudApoyos.value;
    console.log(solicitudApoyos)
  }

  
  validarFormulario(){
    
    this.formularioSolicitudApoyos.controls.entidad_financiera.markAsTouched();
    this.formularioSolicitudApoyos.controls.fecha_solicitud.markAsTouched();
    this.formularioSolicitudApoyos.controls.estrato.markAsTouched();
    this.formularioSolicitudApoyos.controls.numero_cuenta.markAsTouched();
    this.formularioSolicitudApoyos.controls.tipo_cuenta.markAsTouched();

    
    
  }

}
