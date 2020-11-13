import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoApoyoService } from './../../services/tipo-apoyo.service';


@Component({
  selector: 'app-tipo-apoyo',
  templateUrl: './tipo-apoyo.component.html',
  styleUrls: ['./tipo-apoyo.component.css']
})
export class TipoApoyoComponent implements OnInit {

  public formularioCrearApoyo: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public TipoApoyoService: TipoApoyoService,
    ) { 

      this.formularioCrearApoyo = this.formBuilder.group({
        nombre_tipo_apoyo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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
      nombre_tipo_apoyo: crearApoyo.nombre_tipo_apoyo
    }

    const apoyoGuardado = await this.TipoApoyoService.saveTipoApoyo(tipoApoyo);
    console.log(apoyoGuardado);


    this.formularioCrearApoyo.reset();
  }



}
