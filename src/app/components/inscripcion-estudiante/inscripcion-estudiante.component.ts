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
    private route: ActivatedRoute,
  ) {
    this.formularioInscripcionEstudiante = this.formBuilder.group({
      codigo_est: [0, Validators.required],
      tipo_doc_id: ['', Validators.required],
      documento_id: [0, Validators.required],
      primer_nombre: ['', Validators.required],
      primer_apellido: ['', Validators.required],
      genero: ['', Validators.required],
      sede: ['', Validators.required],
      programa_acad: ['', Validators.required],
      fecha_nacimiento: [Date, Validators.required],
      pais_nacimiento: ['', Validators.required],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      estrato: ['', Validators.required],
      semestre: ['', Validators.required],
      promedio: ['', Validators.required],
      cred_cursados: [0, Validators.required],
      cred_cursar: [0, Validators.required],
      periodo_inscrip: ['', Validators.required],
      ano_inscrip: ['', Validators.required],
      fecha_inscripcion: [Date, Validators.required],
      celular: [0, Validators.required],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      tipo_movilidad: ['', Validators.required],
      nombre_institucion: ['', Validators.required],
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



  async guardarFormulario() {
    if (this.formularioInscripcionEstudiante.invalid) {
      return Object.values(this.formularioInscripcionEstudiante.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    const inscribirEstudiante = this.formularioInscripcionEstudiante.value;
    console.log(inscribirEstudiante)

    const aspUisPersonal = {
      codigo_est: inscribirEstudiante.codigo_est,
      tipo_doc_id: inscribirEstudiante.tipo_doc_id,
      documento_id: inscribirEstudiante.documento_id,
      primer_nombre: inscribirEstudiante.primer_nombre,
      primer_apellido: inscribirEstudiante.primer_apellido,
      genero: inscribirEstudiante.genero,
      fecha_nacimiento: inscribirEstudiante.fecha_nacimiento,
      pais_nacimiento: inscribirEstudiante.pais_nacimiento,
      departamento: inscribirEstudiante.departamento,
      ciudad: inscribirEstudiante.ciudad,
      direccion: inscribirEstudiante.direccion,
      estrato: inscribirEstudiante.estrato,
      celular: inscribirEstudiante.celular,
      correo: inscribirEstudiante.correo
    }


    const inscribirEstudianteAcademic = this.formularioInscripcionEstudiante.value;

    const aspUisAcademic = {
      codigo_est: inscribirEstudianteAcademic.codigo_est,
      semestre: inscribirEstudianteAcademic.semestre,
      promedio: inscribirEstudianteAcademic.promedio,
      programa_acad: inscribirEstudianteAcademic.programa_acad,
      cred_cursados: inscribirEstudianteAcademic.cred_cursados,
      cred_cursar: inscribirEstudianteAcademic.cred_cursar,
      periodo_inscrip: inscribirEstudianteAcademic.periodo_inscrip,
      ano_inscrip: inscribirEstudianteAcademic.ano_inscrip,
      fecha_inscripcion: inscribirEstudianteAcademic.fecha_inscripcion
    }

    const aspUisPersonalGuardado = await this.InscripcionEstudianteService.saveAspUisPersonal(aspUisPersonal);
    console.log(aspUisPersonalGuardado);

    const aspUisAcademicGuardado = await this.InscripcionEstudianteService.saveAspUisAcademic(aspUisAcademic);
    console.log(aspUisAcademicGuardado);

    this.formularioInscripcionEstudiante.reset();
  }

  onOptionsSelectedDepartment(codigo_pais: string) {
      //this.locationClear()
      this.DepartamentosService.getDepartamentos(codigo_pais).then((state) => {
        this.departamentos = state
      })
  }

  onOptionsSelectedCity(codigo_departamento: string) {
    this.CiudadesService.getCiudades(codigo_departamento).then((cities) => {
      this.ciudades = cities
    })
  }

  locationClear() {
    this.departamentos = []
    this.ciudades = []
  }

}
