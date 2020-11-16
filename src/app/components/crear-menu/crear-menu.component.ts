import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GuardadoExitosoComponent } from './../guardado-exitoso/guardado-exitoso.component';

@Component({
  selector: 'app-crear-menu',
  templateUrl: './crear-menu.component.html',
  styleUrls: ['./crear-menu.component.css']
})
export class CrearMenuComponent implements OnInit {

  public formularioCrearMenu: FormGroup;
  constructor(private formBuilder: FormBuilder, 
               public dialog: MatDialog) { 

    this.formularioCrearMenu = this.formBuilder.group({
      
      tipo_menu: ['', Validators.required],
      descripcion_menu: ['', Validators.required],
      fecha_inicio_vigencia: [Date, Validators.required],
      fecha_fin_vigencia: [Date, Validators.required],

    });

  }

  openDialog() {
    this.dialog.open(GuardadoExitosoComponent);
  }

  ngOnInit(): void {
  }

  getNoValido(input: string) {
    return this.formularioCrearMenu.get(input).invalid && 
    this.formularioCrearMenu.get(input).touched;
  }

  guardarFormulario() {

    if (this.formularioCrearMenu.invalid) {
      return Object.values(this.formularioCrearMenu.controls).forEach(control => {
        control.markAsTouched();
        
      });

    
    }

    this.formularioCrearMenu.reset();
  }

 

}
