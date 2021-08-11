import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EntidadFinancieraService } from './../../services/entidad-financiera.service';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-entidad-financiera',
  templateUrl: './entidad-financiera.component.html',
  styleUrls: ['./entidad-financiera.component.css']
})
export class EntidadFinancieraComponent implements OnInit {

  public formularioCrearEntidad: FormGroup;


  constructor(private formBuilder: FormBuilder,
              public EntidadFinancieraService: EntidadFinancieraService ,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
  ) {

    this.formularioCrearEntidad = this.formBuilder.group({
      nombre_entidad: ['', Validators.required]
  });
   }

  ngOnInit(): void {
  }

  getNoValido(input: string) {
    return this.formularioCrearEntidad.get(input).invalid &&
      this.formularioCrearEntidad.get(input).touched;
  }

  async guardarFormulario() {
    if (this.formularioCrearEntidad.invalid) {
      return Object.values(this.formularioCrearEntidad.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    const crearEntidadFinanciera = this.formularioCrearEntidad.value;
    console.log(crearEntidadFinanciera)

    const entidadFinanciera = {
      nombre_entidad: crearEntidadFinanciera.nombre_entidad
    }

    const entidadFinancieraGuardado = await this.EntidadFinancieraService.saveEntidadFinanciera(entidadFinanciera);
    console.log(entidadFinancieraGuardado);
    let code = 211;
    this.dialog.open(CustomDialogComponent, { data: { code: code}});


    this.formularioCrearEntidad.reset();

  }


}
