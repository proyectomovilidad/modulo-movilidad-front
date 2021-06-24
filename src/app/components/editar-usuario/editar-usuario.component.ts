import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuariosService} from '../../services/usuarios.service';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../../../environments/environment';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
  public usuariosService: UsuariosService,
  ) {
    this.formUsuario = this.formBuilder.group({
      correo: ['', Validators.required],
      contrasena: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  public formUsuario: FormGroup;
  public roles = environment.roles;
  private id = this.route.snapshot.queryParams._id;


  ngOnInit(): void {
    const user = environment.user;

    if(!this.route.snapshot.data['roles'].includes(user.rol)){
      this.router.navigateByUrl(environment.unauthorizedPage);
      this.dialog.open(CustomDialogComponent, { data: { code: 403}});
    }


    this.usuariosService.getUsuarioById(this.id).then( resp => {
      if (resp.status === true) {
        const user = resp.data;
        this.formUsuario.controls.correo.setValue(user.correo)
        this.formUsuario.controls.contrasena.setValue(user.contrasena)
        this.formUsuario.controls.rol.setValue(user.rol)
      }
    } )
  }

  public actualizar() {
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

    this.usuariosService.saveUsuario(usuarioData).then( resp => {
      let codigo = 210;
      if (resp.status === true) {
        codigo = 200;
      }
    });

  }

  public cancelar(){
    this.router.navigateByUrl('/usuarios');
  }

  getNoValido(input: string) {
    return this.formUsuario.get(input).invalid &&
      this.formUsuario.get(input).touched;
  }



}
