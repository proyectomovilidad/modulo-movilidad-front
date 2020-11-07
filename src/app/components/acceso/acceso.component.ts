import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent implements OnInit {

  public formularioAcceso: FormGroup;
  constructor( private formBuilder: FormBuilder) { 

                this.formularioAcceso = this.formBuilder.group({
                  usuario: ['', Validators.required],
                  contrasena: ['', Validators.required],
                });



}

ngOnInit(): void {
}

getNoValido(input: string) {
  return this.formularioAcceso.get(input).invalid && 
  this.formularioAcceso.get(input).touched;
}


guardarFormulario() {

  if (this.formularioAcceso.invalid) {

    return Object.values(this.formularioAcceso.controls).forEach(control => {

      control.markAsTouched();
      
    });

  
  }

  this.formularioAcceso.reset();
}



}
