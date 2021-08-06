import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {UsuariosService} from '../../services/usuarios.service';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              public usuariosService: UsuariosService,
              private dialog: MatDialog
  ) {
    this.formUsuario = this.formBuilder.group({
      correo: ['', Validators.required],
      contrasena: ['', Validators.required],
      rol: ['', Validators.required]
    });

    this.formConsulta = this.formBuilder.group({
      correo: [''],
      rol: ['']
    });
  }

  public formUsuario: FormGroup;
  public formConsulta: FormGroup;
  public usuarios: any = [];
  public roles: any =  environment.roles;

  ngOnInit(): void {
    this.obtenerDatos();
  }

  public guardarUsuario() {
    if (this.formUsuario.invalid) {
      return Object.values(this.formUsuario.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const formData = this.formUsuario.value;

    const usuarioData = {
      correo: formData.correo,
      contrasena: formData.contrasena,
      rol: formData.rol
    }

   let code = usuarioData.correo ? 201 : 210;
    this.dialog.open(CustomDialogComponent, { data: { code: code}}); 

    this.usuariosService.saveUsuario(usuarioData).then( resp => {
      let codigo = 210;
      if (resp.status === true) {
        this.obtenerDatos();
        this.limpiarFormulario();
        codigo = 200;
      }
    });

  }

  public consultar() {
    const formData = this.formConsulta.value

    const consulta = {
      "correo": formData.correo,
      "rol": formData.rol
    };

    this.usuariosService.consultar(consulta).then( resp => {
      console.log(resp)
      if (resp.status === true ) {
        this.usuarios = resp.data;
      }
    } );
  }

  public editar(id) {
    this.router.navigateByUrl('/editar-usuario?_id=' + id);
  }

  public eliminar(id) {
    this.usuariosService.eliminarUsuario(id).then( resp => {
      let codigo = 200;
      if (resp.status === true ) {
        this.obtenerDatos();
        codigo = 200;
      }
    });
  }

  public cancelarConsulta() {
    this.formConsulta.reset();
    this.obtenerDatos();
  }

  private obtenerDatos() {
    this.usuariosService.getAllUsuarios().then( resp => {
     if (resp.status === true ) {
       this.usuarios = resp.data;
     }
    });
  }

  limpiarFormulario() {
    this.formUsuario.reset();
  }

  getNoValido(input: string) {
    return this.formUsuario.get(input).invalid &&
      this.formUsuario.get(input).touched;
  }

  public getRol(val): String {
    let rol = this.roles.find( x => x.val === val) || {texto: 'No Encontrado'}

    return rol.texto
  }

}
