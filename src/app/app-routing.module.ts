import {  ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccesoComponent } from './components/acceso/acceso.component';
import { InscripcionEstudianteComponent } from './components/inscripcion-estudiante/inscripcion-estudiante.component';
import { IncripcionExternoComponent } from './components/inscripcion-externo/incripcion-externo.component';
import { IndexComponent } from './components/index/index.component';
import { ErrorComponent } from './components/error/error.component';
import { ConsultarEstadoComponent } from './components/consultar-estado/consultar-estado.component';
import { CambiarEstadoComponent } from './components/cambiar-estado/cambiar-estado.component';
import { CargaDocumentosComponent } from './components/carga-documentos/carga-documentos.component';
import { RevisionDocumentosComponent } from './components/revision-documentos/revision-documentos.component';
import { ConsultarDocumentosComponent } from './components/consultar-documentos/consultar-documentos.component';
import { SolicitudApoyosComponent } from './components/solicitud-apoyos/solicitud-apoyos.component';
import { SolicitudApoyosRelextComponent } from './components/solicitud-apoyos-relext/solicitud-apoyos-relext.component';
import { AdministracionMenusComponent } from './components/administracion-menus/administracion-menus.component';
import { CrearMenuComponent } from './components/crear-menu/crear-menu.component';
import { GuardadoExitosoComponent } from './components/guardado-exitoso/guardado-exitoso.component';
import { InstitucionCooperantesComponent } from './components/institucion-cooperantes/institucion-cooperantes.component';
import { EditarInstitucionComponent } from './components/editar-institucion/editar-institucion.component';
import { EstudiantesMovilidadComponent } from './components/estudiantes-movilidad/estudiantes-movilidad.component';
import { TipoDocumentoComponent } from './components/tipo-documento/tipo-documento.component';
import { TipoApoyoComponent } from './components/tipo-apoyo/tipo-apoyo.component';

const appRoutes: Routes = [

  {path: '', component: IndexComponent},
  {path: 'inicio', component: IndexComponent},
  {path: 'acceso', component: AccesoComponent},
  {path: 'inscripcion-externo', component: IncripcionExternoComponent},
  {path: 'inscripcion-estudiante', component: InscripcionEstudianteComponent},
  {path: 'consultar-estado', component: ConsultarEstadoComponent},
  {path: 'cambiar-estado', component: CambiarEstadoComponent},
  {path: 'carga-documentos', component: CargaDocumentosComponent},
  {path: 'revision-documentos', component:RevisionDocumentosComponent},
  {path: 'consultar-documentos', component:ConsultarDocumentosComponent},
  {path: 'solicitud-apoyos', component:SolicitudApoyosComponent},
  {path: 'solicitud-apoyos-relext', component:SolicitudApoyosRelextComponent},
  {path: 'administrar-menus', component:AdministracionMenusComponent},
  {path: 'crear-menu', component:CrearMenuComponent},
  {path: 'guardado-exitoso', component:GuardadoExitosoComponent},
  {path: 'institucion-cooperante', component:InstitucionCooperantesComponent},
  {path: 'editar-institucion', component:EditarInstitucionComponent},
  {path: 'estudiantes-movilidad', component:EstudiantesMovilidadComponent},
  {path: 'tipo-documento', component:TipoDocumentoComponent},
  {path: 'tipo-apoyo', component:TipoApoyoComponent},

  {path: '**', component: ErrorComponent }


];

export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);