import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaisesService } from './../../services/paises.service';
import { DepartamentosService } from './../../services/departamentos.service';
import { CiudadesService } from './../../services/ciudades.service';
import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
import { ProgramasService } from './../../services/programas.service';
import { TiposDocumentosIdService } from './../../services/tipos-documentos-id.service';
import { TipoMovilidadService } from './../../services/tipo-movilidad.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-inscripcion',
  templateUrl: './editar-inscripcion.component.html',
  styleUrls: ['./editar-inscripcion.component.css']
})
export class  EditarInscripcionComponent implements OnInit {

  public ciudades: any;
  public paises: any;
  public departamentos: any;
  public institucionesCooperantes: any;
  public programas: any;
  public documentosId: any;
  public tiposMovilidad: any;

  public formularioEditarEstudiante: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public PaisesService: PaisesService,
    public DepartamentosService: DepartamentosService,
    public CiudadesService: CiudadesService,
    public InstitucionCooperanteService: InstitucionCooperanteService,
    public ProgramasService: ProgramasService,
    public TiposDocumentosIdService: TiposDocumentosIdService,
    public TipoMovilidadService: TipoMovilidadService,
    private route: ActivatedRoute,
  ) {
    this.formularioEditarEstudiante = this.formBuilder.group({
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
    this.paises = await this.PaisesService.getPais();
    this.institucionesCooperantes = await this.InstitucionCooperanteService.getInstitucionCooperante();
    this.programas = await this.ProgramasService.getProgramaAcademico();
    this.documentosId = await this.TiposDocumentosIdService.getTipoDocumentoId();
    this.tiposMovilidad = await this.TipoMovilidadService.getTipoMovilidad();



  }

  getNoValido(input: string) {
    return this.formularioEditarEstudiante.get(input).invalid &&
      this.formularioEditarEstudiante.get(input).touched;
  }



  async guardarFormulario() {
    if (this.formularioEditarEstudiante.invalid) {
      return Object.values(this.formularioEditarEstudiante.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    const editarEstudiante = this.formularioEditarEstudiante.value;
    console.log(editarEstudiante)

    const aspUisPersonal = {
      codigo_est: editarEstudiante.codigo_est,
      tipo_doc_id: editarEstudiante.tipo_doc_id,
      documento_id: editarEstudiante.documento_id,
      primer_nombre: editarEstudiante.primer_nombre,
      primer_apellido: editarEstudiante.primer_apellido,
      genero: editarEstudiante.genero,
      fecha_nacimiento: editarEstudiante.fecha_nacimiento,
      pais_nacimiento: editarEstudiante.pais_nacimiento,
      departamento: editarEstudiante.departamento,
      ciudad: editarEstudiante.ciudad,
      direccion: editarEstudiante.direccion,
      estrato: editarEstudiante.estrato,
      celular: editarEstudiante.celular,
      correo: editarEstudiante.correo
    }


    const editarEstudianteAcademic = this.formularioEditarEstudiante.value;

    const aspUisAcademic = {
      codigo_est: editarEstudianteAcademic.codigo_est,
      semestre: editarEstudianteAcademic.semestre,
      promedio: editarEstudianteAcademic.promedio,
      programa_acad: editarEstudianteAcademic.programa_acad,
      cred_cursados: editarEstudianteAcademic.cred_cursados,
      cred_cursar: editarEstudianteAcademic.cred_cursar,
      periodo_inscrip: editarEstudianteAcademic.periodo_inscrip,
      ano_inscrip: editarEstudianteAcademic.ano_inscrip,
      fecha_inscripcion: editarEstudianteAcademic.fecha_inscripcion
    }

   

    this.formularioEditarEstudiante.reset();
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

}