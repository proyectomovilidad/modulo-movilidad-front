import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module'

import { InscripcionEstudianteService } from './services/inscripcion-estudiante.service';
import { InstitucionCooperanteService } from './services/institucion-cooperante.service';
import { DepartamentosService } from './services/departamentos.service';
import { PaisesService } from './services/paises.service';
import { CiudadesService } from './services/ciudades.service';
import { TipoApoyoService } from './services/tipo-apoyo.service'
import {ProgramaAcademicoService}  from './services/programa-academico.service';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';



import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { InscripcionEstudianteComponent } from './components/inscripcion-estudiante/inscripcion-estudiante.component';
import { IncripcionExternoComponent } from './components/inscripcion-externo/incripcion-externo.component';
import { ConsultarEstadoComponent } from './components/consultar-estado/consultar-estado.component';
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




@NgModule({
  declarations: [
    AppComponent,
    InscripcionEstudianteComponent,
    IncripcionExternoComponent,
    IndexComponent,
    ErrorComponent,
    ConsultarEstadoComponent,
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
    TipoApoyoComponent
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
    InstitucionCooperanteService,
    DepartamentosService,
    PaisesService,
    CiudadesService,
    TipoApoyoService,
    ProgramaAcademicoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
