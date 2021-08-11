import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})


export class AppComponent implements OnInit {
  title = 'modulo-movilidad-angular';
  private permisos_ruta = [
    { ruta: '/inicio', texto: 'Inicio', roles: [ true ] },
    { ruta: '/inicio-sesion', texto: 'Acceso al sistema', roles: [ -1 ] },
    { ruta: '/inicio-sesion', texto: 'Sesion', roles: [ 1,2,3,4,5 ] },
    { ruta: '/entorno-movilidad', texto: 'Entorno Movilidad', roles: [ 1, 5 ] },
    { ruta: '/inscripcion-externo', texto: 'Movilidad Entrante', roles: [ 1 ] },
    { ruta: '/inscripcion-estudiante', texto: 'Movilidad Saliente', roles: [ 1 ] },
    { ruta: '/carga-documentos', texto: 'Carga Documentos', roles: [ 1, 2, 3 ] },
    { ruta: '/consultar-documentos', texto: 'Consulta Documentos', roles: [ 1 ] },
    { ruta: '/revision-documentos', texto: 'Revision Documentos', roles: [ 1 ] },
    { ruta: '/tipo-documento', texto: 'Tipo Documentos', roles: [ 1,5 ] },
    { ruta: '/tipo-apoyo', texto: 'Tipo Apoyos', roles: [ 1,5 ] },
    { ruta: '/solicitud-apoyos', texto: 'Solicitud Apoyos', roles: [ 2 ] },
    { ruta: '/solicitud-apoyos-relext', texto: 'Consultar apoyos', roles: [ 1 ] },
    { ruta: '/profesores-movilidad', texto: 'Profesores Movilidad', roles: [ 1,4 ] },
    { ruta: '/estudiantes-movilidad', texto: 'Estudiantes Movilidad', roles: [ 1,5 ] },
    { ruta: '/externos-movilidad', texto: 'Externos Movilidad', roles: [ 1,5 ] },
    { ruta: '/convenios', texto: 'Convenios', roles: [ -1, 1, 2, 3, 4, 5 ] },
    { ruta: '/usuarios', texto: 'Usuarios', roles: [ 1 ] },
    { ruta: '/convocatoria', texto: 'Convocatorias', roles: [ -1, 1, 2, 3, 4, 5 ] },
    { ruta: '/institucion-cooperante', texto: 'Institucion Cooperante', roles: [1,5] },
    {ruta:  '/visualizar-estudiante',texto:' Datos estudiante' ,  roles: [2]},
    {ruta:  '/visualizar-externo',texto:' Datos externo' ,  roles: [3]},


  ];

  public permisos_usuario = [];

  public user: any = environment.user;
 rol = environment.user.rol

  ngOnInit() {
  	environment.TOKEN = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'));

  	if(user) {
      environment.user = user;
      this.user = user;
    }

  	for (let permiso of this.permisos_ruta) {
  	  if (this.can(permiso)) {
        this.permisos_usuario.push(permiso)
      }
    }

  	console.log('token: ', environment.TOKEN)
  	console.log('Usuario: ', environment.user)
  }

  public can(ruta: any): boolean {
    const rol = environment.user.rol
    let result: boolean = false;
    if (ruta.roles.includes(true)) return true;

    result = ruta.roles.includes(rol);
    return result;
  }

  cerrarSesion(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}


