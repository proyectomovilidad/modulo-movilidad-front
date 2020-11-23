import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module'

import { InscripcionEstudianteService } from './services/inscripcion-estudiante.service';
import { InscripcionExternoService } from './services/inscripcion-externo.service';
import { InstitucionCooperanteService } from './services/institucion-cooperante.service';
import { DepartamentosService } from './services/departamentos.service';
import { PaisesService } from './services/paises.service';
import { CiudadesService } from './services/ciudades.service';
import { TipoApoyoService } from './services/tipo-apoyo.service';
import { ProgramasService } from './services/programas.service';
import { TiposDocumentosIdService } from './services/tipos-documentos-id.service';
import { SolicitudApoyoService } from './services/solicitud-apoyo.service';
import { EntidadFinancieraService } from './services/entidad-financiera.service';
import { ProfesoresService } from './services/profesores.service';
import { TipoDocumentoService } from './services/tipo-documento.service';
import { TipoMovilidadService } from './services/tipo-movilidad.service';
import { ConveniosService } from './services/convenios.service';
import { TipoConvenioService } from './services/tipo-convenio.service';
import { ConvocatoriaService } from './services/convocatoria.service';
import { TipoProyectoService } from './services/tipo-proyecto.service';




import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { InscripcionEstudianteComponent } from './components/inscripcion-estudiante/inscripcion-estudiante.component';
import { IncripcionExternoComponent } from './components/inscripcion-externo/incripcion-externo.component';
import { CambiarEstadoComponent } from './components/cambiar-estado/cambiar-estado.component';
import { ErrorComponent } from './components/error/error.component';
import { CargaDocumentosComponent } from './components/carga-documentos/carga-documentos.component';
import { AccesoComponent } from './components/acceso/acceso.component';
import { RevisionDocumentosComponent } from './components/revision-documentos/revision-documentos.component';
import { ConsultarDocumentosComponent } from './components/consultar-documentos/consultar-documentos.component';
import { ObservacionesComponent } from './components/observaciones/observaciones.component';
import { SolicitudApoyosComponent } from './components/solicitud-apoyos/solicitud-apoyos.component';
import { SolicitudApoyosRelextComponent } from './components/solicitud-apoyos-relext/solicitud-apoyos-relext.component';
import { AdministracionMenusComponent } from './components/administracion-menus/administracion-menus.component';
import { CrearMenuComponent } from './components/crear-menu/crear-menu.component';
import { ConsultarMenuComponent } from './components/consultar-menu/consultar-menu.component';
import { GuardadoExitosoComponent } from './components/guardado-exitoso/guardado-exitoso.component';
import { InstitucionCooperantesComponent } from './components/institucion-cooperantes/institucion-cooperantes.component';
import { EditarInstitucionComponent } from './components/editar-institucion/editar-institucion.component';
import { EstudiantesMovilidadComponent } from './components/estudiantes-movilidad/estudiantes-movilidad.component';
import { TipoDocumentoComponent } from './components/tipo-documento/tipo-documento.component';
import { TipoApoyoComponent } from './components/tipo-apoyo/tipo-apoyo.component'
import { from } from 'rxjs';
import { EntidadFinancieraComponent } from './components/entidad-financiera/entidad-financiera.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';
import { ConveniosComponent } from './components/convenios/convenios.component';
import { ConvocatoriaComponent } from './components/convocatoria/convocatoria.component';
import { EditarInscripcionComponent } from './components/editar-inscripcion/editar-inscripcion.component';
import { DatosEstudianteComponent } from './components/datos-estudiante/datos-estudiante.component';
import { DatosInstitucionComponent } from './components/datos-institucion/datos-institucion.component';
import { EditarDocumentoComponent } from './components/editar-documento/editar-documento.component';
import { ProfesoresModuloComponent } from './components/profesores-modulo/profesores-modulo.component';
import { EditarProfesorComponent } from './components/editar-profesor/editar-profesor.component';




@NgModule({
  declarations: [
    AppComponent,
    InscripcionEstudianteComponent,
    IncripcionExternoComponent,
    IndexComponent,
    ErrorComponent,
    CambiarEstadoComponent,
    CargaDocumentosComponent,
    AccesoComponent,
    RevisionDocumentosComponent,
    ConsultarDocumentosComponent,
    ObservacionesComponent,
    SolicitudApoyosComponent,
    SolicitudApoyosRelextComponent,
    AdministracionMenusComponent,
    CrearMenuComponent,
    ConsultarMenuComponent,
    GuardadoExitosoComponent,
    InstitucionCooperantesComponent,
    EditarInstitucionComponent,
    EstudiantesMovilidadComponent,
    TipoDocumentoComponent,
    TipoApoyoComponent,
    EntidadFinancieraComponent,
    ProfesoresComponent,
    ConveniosComponent,
    ConvocatoriaComponent,
    EditarInscripcionComponent,
    DatosEstudianteComponent,
    DatosInstitucionComponent,
    EditarDocumentoComponent,
    ProfesoresModuloComponent,
    EditarProfesorComponent,
    
  ],
  entryComponents: [ObservacionesComponent],
  imports: [

BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    routing,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    appRoutingProviders,
    InscripcionEstudianteService,
    InscripcionExternoService,
    InstitucionCooperanteService,
    DepartamentosService,
    PaisesService,
    CiudadesService,
    TipoApoyoService,
    SolicitudApoyoService,
    ProgramasService,
    TiposDocumentosIdService,
    EntidadFinancieraService,
    ProfesoresService,
    TipoDocumentoService,
    TipoMovilidadService,
    ConveniosService,
    TipoConvenioService,
    ConvocatoriaService,
    TipoProyectoService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
