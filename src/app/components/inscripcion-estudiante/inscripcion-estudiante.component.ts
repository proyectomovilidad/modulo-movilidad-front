import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InscripcionEstudianteService } from './../../services/inscripcion-estudiante.service';
import { PaisesService } from './../../services/paises.service';
import { DepartamentosService } from './../../services/departamentos.service';
import { CiudadesService } from './../../services/ciudades.service';
import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
import { ProgramasService } from './../../services/programas.service';
import { TiposDocumentosIdService } from './../../services/tipos-documentos-id.service';
import { TipoMovilidadService } from './../../services/tipo-movilidad.service';
import { ConveniosService } from './../../services/convenios.service';
import { MatDialog } from '@angular/material/dialog';
import { GuardadoExitosoComponent } from './../guardado-exitoso/guardado-exitoso.component';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inscripcion-estudiante',
  templateUrl: './inscripcion-estudiante.component.html',
  styleUrls: ['./inscripcion-estudiante.component.css']
})
export class InscripcionEstudianteComponent implements OnInit {

  public ciudades: any;
  public paises: any;
  public departamentos: any;
  public institucionesCooperantes: any;
  public programas: any;
  public documentosId: any;
  public tiposMovilidad: any;
  public convenios: [];

  public formularioInscripcionEstudiante: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public InscripcionEstudianteService: InscripcionEstudianteService,
    public PaisesService: PaisesService,
    public DepartamentosService: DepartamentosService,
    public CiudadesService: CiudadesService,
    public InstitucionCooperanteService: InstitucionCooperanteService,
    public ProgramasService: ProgramasService,
    public TiposDocumentosIdService: TiposDocumentosIdService,
    public TipoMovilidadService: TipoMovilidadService,
    public ConveniosService: ConveniosService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.formularioInscripcionEstudiante = this.formBuilder.group({
      codigo_est: [0,  Validators.required],
      tipo_doc_id: ['',  Validators.required],
      documento_id: [0 ,  Validators.required],
      primer_nombre: ['',  Validators.required],
      segundo_nombre: [''],
      primer_apellido: ['',  Validators.required],
      segundo_apellido: [''],
      genero: ['',  Validators.required],
      sede: ['',  Validators.required],
      programa_acad: ['',  Validators.required],
      fecha_nacimiento: [Date,  Validators.required],
      pais_nacimiento: ['',  Validators.required],
      departamento: ['',  Validators.required],
      ciudad: ['',  Validators.required],
      direccion: ['',  Validators.required],
      estrato: ['',  Validators.required],
      semestre: ['',  Validators.required],
      promedio: ['',  Validators.required],
      cred_cursados: [0,  Validators.required],
      cred_cursar: [0,  Validators.required],
      periodo_inscrip: ['',  Validators.required],
      ano_inscrip: ['',  Validators.required],
      fecha_inscripcion: [Date,  Validators.required],
      telefono: [0,  Validators.required],
      celular: [0,  Validators.required],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      tipo_movilidad: ['',  Validators.required],
      nombre_institucion: ['',  Validators.required],
      nombre_convenio: ['',  Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    //this.ciudades = await this.CiudadesService.getCiudades();
    this.paises = await this.PaisesService.getPais();
    //this.departamentos = await this.DepartamentosService.getDepartamentos();
    this.institucionesCooperantes = await this.InstitucionCooperanteService.getInstitucionCooperante();
    this.programas = await this.ProgramasService.getProgramaAcademico();
    this.documentosId = await this.TiposDocumentosIdService.getTipoDocumentoId();
    this.tiposMovilidad = await this.TipoMovilidadService.getTipoMovilidad();
  }

  
  getNoValido(input: string) {
    return this.formularioInscripcionEstudiante.get(input).invalid &&
      this.formularioInscripcionEstudiante.get(input).touched; 
      
  }

   async estudianteSave(aspUisPersonal: any) {
    const aspUisPersonalGuardado = await this.InscripcionEstudianteService.saveAspUisPersonal(aspUisPersonal);
    console.log(aspUisPersonalGuardado);
    return aspUisPersonalGuardado;


  } 


  async guardarFormulario() {
    if (this.formularioInscripcionEstudiante.invalid) {
      return Object.values(this.formularioInscripcionEstudiante.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const inscribirEstudiantePersonal = this.formularioInscripcionEstudiante.value;
    console.log(inscribirEstudiantePersonal)

    const aspUisPersonal = {
      codigo_est: inscribirEstudiantePersonal.codigo_est,
      tipo_doc_id: inscribirEstudiantePersonal.tipo_doc_id,
      documento_id: inscribirEstudiantePersonal.documento_id,
      primer_nombre: inscribirEstudiantePersonal.primer_nombre,
      segundo_nombre: inscribirEstudiantePersonal.segundo_nombre,
      primer_apellido: inscribirEstudiantePersonal.primer_apellido,
      segundo_apellido: inscribirEstudiantePersonal.segundo_apellido,
      genero: inscribirEstudiantePersonal.genero,
      fecha_nacimiento: inscribirEstudiantePersonal.fecha_nacimiento,
      pais_nacimiento: inscribirEstudiantePersonal.pais_nacimiento,
      departamento: inscribirEstudiantePersonal.departamento,
      ciudad: inscribirEstudiantePersonal.ciudad,
      direccion: inscribirEstudiantePersonal.direccion,
      estrato: inscribirEstudiantePersonal.estrato,
      telefono: inscribirEstudiantePersonal.telefono,
      celular: inscribirEstudiantePersonal.celular,
      correo: inscribirEstudiantePersonal.correo
    }


    const inscribirEstudianteAcademic = this.formularioInscripcionEstudiante.value;

    const aspUisAcademic = {
      codigo_est: inscribirEstudianteAcademic.codigo_est,
      semestre: inscribirEstudianteAcademic.semestre,
      sede: inscribirEstudianteAcademic.sede,
      promedio: inscribirEstudianteAcademic.promedio,
      programa_acad: inscribirEstudianteAcademic.programa_acad,
      cred_cursados: inscribirEstudianteAcademic.cred_cursados,
      cred_cursar: inscribirEstudianteAcademic.cred_cursar,
      periodo_inscrip: inscribirEstudianteAcademic.periodo_inscrip,
      ano_inscrip: inscribirEstudianteAcademic.ano_inscrip,
      fecha_inscripcion: inscribirEstudianteAcademic.fecha_inscripcion
    }

    const inscribirEstudiante = this.formularioInscripcionEstudiante.value;

    const inscribir = {

      tipo_movilidad: inscribirEstudiante.tipo_movilidad,
      nombre_institucion: inscribirEstudiante.nombre_institucion,
      nombre_convenio: inscribirEstudiante.nombre_convenio,
      codigo_est: inscribirEstudiante.codigo_est

    }

     const aspUisPersonalGuardado = await this.InscripcionEstudianteService.saveAspUisPersonal(aspUisPersonal);
     if (aspUisPersonalGuardado.status==false) {
       console.log("El estudiante no se ha guardado")
     }
     else if (aspUisPersonalGuardado.status==true){
      const aspUisAcademicGuardado = await this.InscripcionEstudianteService.saveAspUisAcademic(aspUisAcademic);
      if (aspUisAcademicGuardado.status==true){
        const inscritoGuardado = await this.InscripcionEstudianteService.saveInscripcion(inscribir);
        console.log("PruebaInscrito", inscritoGuardado)
      }
     }

     console.log(aspUisPersonalGuardado);
  
    this.formularioInscripcionEstudiante.reset();



  }

  limpiarFormulario() {
    this.formularioInscripcionEstudiante.reset();
  }
 

  onOptionsSelectedDepartment(codigo_pais: string) {
    this.DepartamentosService.getDepartamentos(codigo_pais).then((state) => {
      this.departamentos = state
    })
  }


  onOptionsSelectedCity(codigo_departamento: string) {
    this.CiudadesService.getCiudades(codigo_departamento).then((cities) => {
      this.ciudades = cities
    })
  }

  movilidadConvenio(tipo_movilidad: String) {
    console.log("tiposMovilidad", tipo_movilidad)
     this.ConveniosService.getConvenioByTipoMovilidad(tipo_movilidad).then((convenio) => {
      this.convenios= convenio
    })
  }

  convenioInstitucion(codigo_inst: String) {
    console.log("codigoInst", codigo_inst)
     this.ConveniosService.getConvenioByInstitucion(codigo_inst).then((convenio) => {
      this.convenios= convenio
    })
  }

  openDialog() {
    this.dialog.open(GuardadoExitosoComponent);
  }

}
