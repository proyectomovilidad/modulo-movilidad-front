import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoApoyoService } from './../../services/tipo-apoyo.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-tipo-apoyo',
  templateUrl: './tipo-apoyo.component.html',
  styleUrls: ['./tipo-apoyo.component.css']
})
export class TipoApoyoComponent implements OnInit {

  public apoyos: any;
  public formularioCrearApoyo: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public TipoApoyoService: TipoApoyoService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
  ) {
    this.formularioCrearApoyo = this.formBuilder.group({
      nombre_tipo_apoyo: ['', Validators.required],
      estratos_tipo_apoyo: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    this.apoyos = await this.TipoApoyoService.getApoyo()
  }

  getNoValido(input: string) {
    return this.formularioCrearApoyo.get(input).invalid &&
      this.formularioCrearApoyo.get(input).touched;
  }

  async guardarFormulario() {
    if (this.formularioCrearApoyo.invalid) {
      return Object.values(this.formularioCrearApoyo.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const crearApoyo = this.formularioCrearApoyo.value;
    console.log(crearApoyo)

    const tipoApoyo = {
      nombre_tipo_apoyo: crearApoyo.nombre_tipo_apoyo,
      estratos_tipo_apoyo: crearApoyo.estratos_tipo_apoyo.split(',')
    };

    const apoyoGuardado = await this.TipoApoyoService.saveTipoApoyo(tipoApoyo);
    console.log(apoyoGuardado);


    this.formularioCrearApoyo.reset();
  }

  editarTpApoyo( id: any): void{
    this.router.navigateByUrl(`/editar-tipo-apoyo?_id=${id}` );
  }

  async eliminarApoyo(id: any, obj: any) {
    let respuesta = await this.TipoApoyoService.deleteApoyo(id);
    console.log(respuesta);
    if (respuesta.status) {
      this.apoyos.splice(this.apoyos.indexOf(obj), 1);
    }
    this.dialog.open(CustomDialogComponent, { data: {title: 'INFO!', message: respuesta.message, type: 'alert'}});
  }



}
