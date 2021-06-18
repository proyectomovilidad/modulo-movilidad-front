import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from './../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios: any;
  public formularioCrearUsuario: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public UsuariosService: UsuariosService,
  ) {
    this.formularioCrearUsuario = this.formBuilder.group({
      correo: ['', Validators.required],
      contrasena: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }

   async ngOnInit(): Promise < void> {
  this.usuarios = await this.UsuariosService.getUsuario()
   }

   getNoValido(input: string) {
  return this.formularioCrearUsuario.get(input).invalid &&
    this.formularioCrearUsuario.get(input).touched;
   }

   async guardarFormulario() {
  if (this.formularioCrearUsuario.invalid) {
    return Object.values(this.formularioCrearUsuario.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  const crearUsuario = this.formularioCrearUsuario.value;

  const usuario = {
    correo: crearUsuario.correo,
    contrasena: crearUsuario.contrasena,
    rol: crearUsuario.rol,

  };

  const usuarioGuardado = await this.UsuariosService.saveUsuario(usuario);



  this.formularioCrearUsuario.reset();
}
  


}
