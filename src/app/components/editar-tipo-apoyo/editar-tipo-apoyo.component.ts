import { Component, OnInit } from '@angular/core';
import { TipoApoyoService } from './../../services/tipo-apoyo.service';
import {ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-editar-tipo-apoyo',
  templateUrl: './editar-tipo-apoyo.component.html',
  styleUrls: ['./editar-tipo-apoyo.component.css']
})
export class EditarTipoApoyoComponent implements OnInit {

  constructor(private tipoApoyoService: TipoApoyoService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
  ) { }

  public tipoApoyo: any;
  public formularioEditarApoyo: FormGroup;
  private id = this.route.snapshot.queryParams._id;


  ngOnInit(): void {
    this.formularioEditarApoyo = this.formBuilder.group({
      nombre_tipo_apoyo: ['', Validators.required],
      estratos_tipo_apoyo: ['', Validators.required]
    });

    this.tipoApoyoService.getTipoApoyoById(this.id).then(resp => {
      if (resp.status){
        this.tipoApoyo = resp.data;
        this.formularioEditarApoyo.controls.nombre_tipo_apoyo.setValue(this.tipoApoyo.nombre_tipo_apoyo);
        this.formularioEditarApoyo.controls.estratos_tipo_apoyo.setValue(this.tipoApoyo.estratos_tipo_apoyo.join());
      }else{
        this.dialog.open(CustomDialogComponent, { data: {title: 'INFO!', message: resp.message, type: 'alert'}});
      }
    });
  }

  public actualizar(){
    if (this.formularioEditarApoyo.invalid) {
      return Object.values(this.formularioEditarApoyo.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const formData = this.formularioEditarApoyo.value;

    const tipoApoyo = {
      nombre_tipo_apoyo: formData.nombre_tipo_apoyo,
      estratos_tipo_apoyo: formData.estratos_tipo_apoyo.split(',')
    };

    this.tipoApoyoService.updateTipoApoyo(tipoApoyo, this.id).then(resp => {
      this.dialog.open(CustomDialogComponent, { data: {title: 'INFO!', message: 'Actualizado!', type: 'alert'}});
    });
  }

  public regresar(){
    this.router.navigateByUrl('/tipo-apoyo')
  }
  getNoValido(input: string) {
    return this.formularioEditarApoyo.get(input).invalid &&
      this.formularioEditarApoyo.get(input).touched;
  }
}
