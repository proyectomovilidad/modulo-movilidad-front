import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CiudadesService } from './../../services/ciudades.service';
import { PaisesService } from './../../services/paises.service';
import { InscripcionExternoService } from './../../services/inscripcion-externo.service';
import { DepartamentosService } from './../../services/departamentos.service';
import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
import { TipoMovilidadService } from './../../services/tipo-movilidad.service';
import { TiposDocumentosIdService } from './../../services/tipos-documentos-id.service';
import { ProgramasService } from './../../services/programas.service';
import { ConveniosService } from './../../services/convenios.service';
import { EntornoMovilidadService } from './../../services/entorno-movilidad.service';
import { Router } from '@angular/router';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-incripcion-externo',
  templateUrl: './incripcion-externo.component.html',
  styleUrls: ['./incripcion-externo.component.css']
})
export class IncripcionExternoComponent implements OnInit {

  public ciudades: any;
  public paises: any;
  public departamentos: any;
  public institucionesCooperantes: any;
  public programas : any;
  public documentosId : any;
  public tiposMovilidad: any;
  public convenios: [];



  public formularioInscripcionExterno: FormGroup;
  constructor( private router: Router,private EntornoMovilidadService: EntornoMovilidadService, private formBuilder: FormBuilder,
    public InscripcionExternoService: InscripcionExternoService,
    public PaisesService: PaisesService,
    public DepartamentosService: DepartamentosService,
    public CiudadesService: CiudadesService,
    public InstitucionCooperanteService: InstitucionCooperanteService,
    public ProgramasService: ProgramasService,
    public TiposDocumentosIdService: TiposDocumentosIdService,
    public TipoMovilidadService: TipoMovilidadService,
    public ConveniosService: ConveniosService,
               public dialog: MatDialog,


  ) {

      this.formularioInscripcionExterno = this.formBuilder.group({

        tipo_doc_id: ['', Validators.required],
        documento_id: [0, Validators.required],
        primer_nombre: ['', Validators.required],
        segundo_nombre: ['',],
        primer_apellido: ['', Validators.required],
        segundo_apellido: [''],
        genero: ['', Validators.required],
        programa_acad: ['', Validators.required],
        prog_acad_uis: ['', Validators.required],
        fecha_nacimiento: [Date, Validators.required],
        pais_nacimiento: ['', Validators.required],
        pais_res: ['', Validators.required],
        departamento: ['', Validators.required],
        ciudad: ['', Validators.required],
        direccion: ['', Validators.required],
        semestre: ['', Validators.required],
        promedio: [0, Validators.required],
        cred_cursados: [0, Validators.required],
        cred_cursar: [0, Validators.required],
        periodo_inscrip: ['', Validators.required],
        fecha_inscripcion: [Date, Validators.required],
        ano_inscrip: ['', Validators.required],
        celular: [0, Validators.required],
        telefono: [0],
        correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        tipo_movilidad: ['', Validators.required],
        nombre_institucion: ['', Validators.required],
        nombre_convenio:  ['', Validators.required]

      });

    }

  async ngOnInit(): Promise<void>  {
    let date = new Date()
    const periodo = `${date.getFullYear()}-${(date.getMonth() < 6 ? 1 : 2)}`
    console.log(periodo)
    this.EntornoMovilidadService.getFechasByStatus(periodo, 1).then(resp=>{
      let inicio = new Date(resp.fecha_inicio)
      let fin = new Date(resp.fecha_final)
      // validar que hallan fechas activas
      if(date < inicio || date > fin){
        this.router.navigateByUrl('/')
        this.dialog.open(CustomDialogComponent, { data: { message: 'No hay fechas abiertas', title: 'Prohibido', type: 'warning' }});
      }
    })

    this.paises = await this.PaisesService.getPais();
    this.documentosId = await this.TiposDocumentosIdService.getTipoDocumentoId();
    this.institucionesCooperantes = await this.InstitucionCooperanteService.getInstitucionCooperante();
    // this.programas = await this.ProgramasService.getProgramaAcademico();
    // this.tiposMovilidad = await this.TipoMovilidadService.getTipoMovilidad();
    // this.convenios = await this.ConveniosService.getAllConvenios();
  }


  getNoValido(input: string) {
    return this.formularioInscripcionExterno.get(input).invalid &&
    this.formularioInscripcionExterno.get(input).touched;
  }

  async externoSave(aspExtPersonal: any) {
    const aspExtPersonalGuardado = await this.InscripcionExternoService.saveAspExtPersonal(aspExtPersonal);
    console.log(aspExtPersonalGuardado);
    return aspExtPersonalGuardado;


  }

 async guardarFormulario() {
    if (this.formularioInscripcionExterno.invalid) {
      return Object.values(this.formularioInscripcionExterno.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const inscribirExternoPersonal = this.formularioInscripcionExterno.value;
    console.log(inscribirExternoPersonal)

    const aspExtPersonal = {

      tipo_doc_id: inscribirExternoPersonal.tipo_doc_id,
      documento_id: inscribirExternoPersonal.documento_id,
      primer_nombre: inscribirExternoPersonal.primer_nombre,
      segundo_nombre: inscribirExternoPersonal.segundo_nombre,
      primer_apellido:inscribirExternoPersonal.primer_apellido,
      segundo_apellido:inscribirExternoPersonal.segundo_apellido,
      genero:inscribirExternoPersonal.genero,
      fecha_nacimiento:inscribirExternoPersonal.fecha_nacimiento,
      pais_nacimiento:inscribirExternoPersonal.pais_nacimiento,
      pais_res:inscribirExternoPersonal.pais_res,
      departamento:inscribirExternoPersonal.departamento,
      ciudad: inscribirExternoPersonal.ciudad,
      direccion: inscribirExternoPersonal.direccion,
      celular:inscribirExternoPersonal.celular,
      telefono:inscribirExternoPersonal.telefono,
      correo:inscribirExternoPersonal.correo
    }

    const inscribirExternoAcademic = this.formularioInscripcionExterno.value;

    const aspExtAcademic = {

      documento_id: inscribirExternoAcademic.documento_id,
      semestre: inscribirExternoAcademic.semestre ,
      promedio:inscribirExternoAcademic.promedio,
      programa_acad: inscribirExternoAcademic.programa_acad,
      cred_cursados: inscribirExternoAcademic.cred_cursados,
      cred_cursar: inscribirExternoAcademic.cred_cursar ,
      periodo_inscrip: inscribirExternoAcademic.periodo_inscrip ,
      ano_inscrip: inscribirExternoAcademic.ano_inscrip  ,
      nombre_institucion: inscribirExternoAcademic. nombre_institucion,
      fecha_inscripcion: inscribirExternoAcademic.fecha_inscripcion,
      prog_acad_uis: inscribirExternoAcademic.prog_acad_uis
    }

    const inscribirExterno = this.formularioInscripcionExterno.value;

    const inscribir = {

      tipo_movilidad: inscribirExterno.tipo_movilidad,
      nombre_institucion: inscribirExterno.nombre_institucion,
      nombre_convenio: inscribirExterno.nombre_convenio,
      documento_id: inscribirExterno.documento_id,
      admitido: -1

    }

    const aspExtPersonalGuardado = await this.InscripcionExternoService.saveAspExtPersonal(aspExtPersonal);
    console.log(aspExtPersonalGuardado);

   if (aspExtPersonalGuardado.status==true){
     const aspExtAcademicGuardado = await this.InscripcionExternoService.saveAspExtAcademic(aspExtAcademic);
    console.log(aspExtAcademicGuardado);
    if (aspExtAcademicGuardado.status==true){
      const externoGuardado = await this.InscripcionExternoService.saveInscripcion(inscribir);
      console.log("Inscripción", externoGuardado); // Aquí se incluye la ventana emergente con el mensaje de guardado existoso
    }}

    this.formularioInscripcionExterno.reset();
  }

  limpiarFormulario() {
    this.formularioInscripcionExterno.reset();
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

onOptionsSelectedProgAcademico(institucionId: string){
  this.programas = []
  this.tiposMovilidad = []
  this.convenios = []

  if(institucionId)
  {
    this.ProgramasService.getProgramaAcademicoByInstitucion(institucionId).then(programs=>{
      programs.forEach(element=>{this.programas.push(element.programaAcademico)})
    })
  }
}

onOptionsSelectedTipoMovilidad(progAcadId: string, instId: string){
  this.tiposMovilidad = []
  this.convenios = []

  if(progAcadId && instId) {
    this.TipoMovilidadService.getTipoMovilidadByInstProgAcad(instId, progAcadId).then(tiposMov=>{
      tiposMov.forEach(element=>{this.tiposMovilidad.push(element.tipoMovilidad)})
    })
  }
}

onOptionsSelectedConvenios(progAcadId: string, instId: string, tipoMovId: string){
  this.convenios = []

  if(progAcadId && instId && tipoMovId){
    this.ConveniosService.getConvenioByProgAcadInstTipoMov(progAcadId, instId, tipoMovId).then(convns=>{
      this.convenios = convns
    })
  }
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

}
