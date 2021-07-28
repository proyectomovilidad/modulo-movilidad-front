import {  ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscripcionEstudianteComponent } from './components/inscripcion-estudiante/inscripcion-estudiante.component';
import { IncripcionExternoComponent } from './components/inscripcion-externo/incripcion-externo.component';
import { IndexComponent } from './components/index/index.component';
import { ErrorComponent } from './components/error/error.component';
import { CargaDocumentosComponent } from './components/carga-documentos/carga-documentos.component';
import { RevisionDocumentosComponent } from './components/revision-documentos/revision-documentos.component';
import { ConsultarDocumentosComponent } from './components/consultar-documentos/consultar-documentos.component';
import { SolicitudApoyosComponent } from './components/solicitud-apoyos/solicitud-apoyos.component';
import { SolicitudApoyosRelextComponent } from './components/solicitud-apoyos-relext/solicitud-apoyos-relext.component';
import { GuardadoExitosoComponent } from './components/guardado-exitoso/guardado-exitoso.component';
import { InstitucionCooperantesComponent } from './components/institucion-cooperantes/institucion-cooperantes.component';
import { EditarInstitucionComponent } from './components/editar-institucion/editar-institucion.component';
import { EstudiantesMovilidadComponent } from './components/estudiantes-movilidad/estudiantes-movilidad.component';
import { TipoDocumentoComponent } from './components/tipo-documento/tipo-documento.component';
import { TipoApoyoComponent } from './components/tipo-apoyo/tipo-apoyo.component';
import { EntidadFinancieraComponent } from './components/entidad-financiera/entidad-financiera.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';
import { ConveniosComponent } from './components/convenios/convenios.component';
import { ConvocatoriaComponent } from './components/convocatoria/convocatoria.component';
import { EditarInscripcionComponent} from './components/editar-inscripcion/editar-inscripcion.component';
import { EditarDocumentoComponent } from './components/editar-documento/editar-documento.component';
import { ProfesoresModuloComponent } from './components/profesores-modulo/profesores-modulo.component';
import { EditarProfesorComponent } from './components/editar-profesor/editar-profesor.component';
import { ExternosMovilidadComponent } from './components/externos-movilidad/externos-movilidad.component';
import { EditarExternoComponent } from './components/editar-externo/editar-externo.component';
import { EditarConvenioComponent } from './components/editar-convenio/editar-convenio.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { EntornoMovilidadComponent } from './components/entorno-movilidad/entorno-movilidad.component';
import { CrearTipoDocumentoComponent } from './components/crear-tipo-documento/crear-tipo-documento.component'
import { VisualizarConvenioComponent } from './components/visualizar-convenio/visualizar-convenio.component';
import { VisualizarConvocatoriaComponent } from './components/visualizar-convocatoria/visualizar-convocatoria.component';
import { VisualizarEstudianteComponent  } from './components/visualizar-estudiante/visualizar-estudiante.component';
import { VisualizarExternoComponent } from './components/visualizar-externo/visualizar-externo.component';
import { VisualizarProfesorComponent } from './components/visualizar-profesor/visualizar-profesor.component';
import { EditarTipoApoyoComponent } from './components/editar-tipo-apoyo/editar-tipo-apoyo.component';
import {SolicitudApoyosEstComponent} from './components/solicitud-apoyos-est/solicitud-apoyos-est.component';
import {EditarConvocatoriaComponent} from './components/editar-convocatoria/editar-convocatoria.component';
import {EditarEntornoMovilidadComponent} from './components/editar-entorno-movilidad/editar-entorno-movilidad.component';
import {UsuariosComponent} from './components/usuarios/usuarios.component';
import {EditarUsuarioComponent} from './components/editar-usuario/editar-usuario.component';


const appRoutes: Routes = [

  {path: '', component: IndexComponent},
  {path: 'inicio', component: IndexComponent},
  {path: 'inscripcion-externo', component: IncripcionExternoComponent, data: {roles: [5] } },
  {path: 'inscripcion-estudiante', component: InscripcionEstudianteComponent, data: { roles: [1,5] }},
  {path: 'carga-documentos', component: CargaDocumentosComponent, data: {roles: [2, 3]}},
  {path: 'revision-documentos', component:RevisionDocumentosComponent, data: { roles: [1,5]}},
  {path: 'consultar-documentos', component:ConsultarDocumentosComponent, data: { roles: [1,5]}},
  {path: 'solicitud-apoyos', component:SolicitudApoyosComponent, data: {roles: [2]}},
  {path: 'solicitud-apoyos-relext', component:SolicitudApoyosRelextComponent},
  {path: 'guardado-exitoso', component:GuardadoExitosoComponent, data: { roles: [1,5]}},
  {path: 'institucion-cooperante', component:InstitucionCooperantesComponent, data: {roles: [1,5]}},
  {path: 'editar-institucion', component:EditarInstitucionComponent, data: { roles: [1,5]}},
  {path: 'estudiantes-movilidad', component:EstudiantesMovilidadComponent, data: { roles: [1,5]}},
  {path: 'tipo-documento', component:TipoDocumentoComponent, data: { roles: [1,5]}},
  {path: 'tipo-apoyo', component:TipoApoyoComponent, data: { roles: [1,5]}},
  {path: 'entidad-financiera', component:EntidadFinancieraComponent, data: { roles: [1,5]}},
  {path: 'profesores', component:ProfesoresComponent, data: { roles: [1,4,5]}},
  {path: 'convenios', component:ConveniosComponent, data: { roles: [-1, 1, 2, 3,4, 5]}},
  {path: 'convocatoria', component:ConvocatoriaComponent, data: {roles: [1,2, 4, 5]}},
  {path: 'editar-inscripcion', component:EditarInscripcionComponent, data: { roles: [1,5, 2]}},
 //{path: 'editar-inscripcion/:_id', component:EditarInscripcionComponent},
  {path: 'editar-documento', component:EditarDocumentoComponent, data: { roles: [1,5]}},
  {path: 'profesores-movilidad', component:ProfesoresModuloComponent, data: { roles: [1,4,5]}},
  {path: 'editar-profesor', component:EditarProfesorComponent, data: { roles: [1,5]}},
  {path: 'externos-movilidad', component:ExternosMovilidadComponent, data: { roles: [1,5]}},
  {path: 'editar-externo', component:EditarExternoComponent, data: { roles: [1,5, 3]}},
  {path: 'editar-convenio', component:EditarConvenioComponent, data: { roles: [1,5]}},
  {path: 'inicio-sesion', component:InicioSesionComponent, data: { roles: [1,5]}},
  {path: 'entorno-movilidad', component:EntornoMovilidadComponent, data: { roles: [1,5]}},
  {path: 'crear-tipo-documento', component:CrearTipoDocumentoComponent, data: { roles: [1,5]}},
  {path: 'visualizar-convenio',component: VisualizarConvenioComponent , data: { roles: [1,5]}},
  {path: 'visualizar-convocatoria',component: VisualizarConvocatoriaComponent, data: {roles: [1,2,4,5]} },
  {path: 'visualizar-estudiante',component: VisualizarEstudianteComponent , data: { roles: [1, 5, 2]}},
  {path: 'visualizar-externo',component: VisualizarExternoComponent , data: { roles: [1,5, 3 ]}},
  {path: 'visualizar-profesor',component: VisualizarProfesorComponent , data: { roles: [1,5]}},
  { path: 'editar-tipo-apoyo', component: EditarTipoApoyoComponent , data: { roles: [1,5]}},
  { path: 'solicitud-apoyos-est', component: SolicitudApoyosEstComponent, data: { roles: [1, 2, 5]} },
  { path: 'editar-convocatoria', component: EditarConvocatoriaComponent, data: { roles: [1, 5]} },

  { path: 'editar-entorno-movilidad', component: EditarEntornoMovilidadComponent, data: { roles: [ 1, 5 ] } },
  { path: 'usuarios', component: UsuariosComponent, data: { roles: [ 1 ] } },
  { path: 'editar-usuario', component: EditarUsuarioComponent, data: { roles: [1] } },

  {path: '**', component: ErrorComponent }
];

export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
