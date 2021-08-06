import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaisesService } from './../../services/paises.service';
import { DepartamentosService } from './../../services/departamentos.service';
import { CiudadesService } from './../../services/ciudades.service';
import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
import { ProgramasService } from './../../services/programas.service';
import { TiposDocumentosIdService } from './../../services/tipos-documentos-id.service';
import { TipoMovilidadService } from './../../services/tipo-movilidad.service';
import {ActivatedRoute, Router} from '@angular/router';
import { InscripcionEstudianteService } from './../../services/inscripcion-estudiante.service';
import { ConvocatoriaComponent } from './../convocatoria/convocatoria.component';
import { ConveniosService } from './../../services/convenios.service';
import {environment} from '../../../environments/environment';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-editar-inscripcion',
  templateUrl: './editar-inscripcion.component.html',
  styleUrls: ['./editar-inscripcion.component.css']
})
export class EditarInscripcionComponent implements OnInit {

  public ciudades: any;
  public paises: any;
  public departamentos: any;
  public institucionesCooperantes: any;
  public programas: any;
  public documentosId: any;
  public tiposMovilidad: any;
  public estudiantes: any;
  public academics: any;
  public estudianteElegido: any;
  public convenios: any;

  public formularioEditarEstudiante: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public PaisesService: PaisesService,
    public DepartamentosService: DepartamentosService,
    public CiudadesService: CiudadesService,
    public InstitucionCooperanteService: InstitucionCooperanteService,
    public ProgramasService: ProgramasService,
    public TiposDocumentosIdService: TiposDocumentosIdService,
    public TipoMovilidadService: TipoMovilidadService,
    public InscripcionEstudianteService: InscripcionEstudianteService,
    public ConveniosService: ConveniosService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
  ) {
    this.formularioEditarEstudiante = this.formBuilder.group({
      codigo_est: [0, Validators.required],
      tipo_doc_id: ['', Validators.required],
      documento_id: [0, Validators.required],
      primer_nombre: ['', Validators.required],
      segundo_nombre: [''],
      primer_apellido: ['', Validators.required],
      segundo_apellido: [''],
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
      telefono: [0],
      celular: [0, Validators.required],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      tipo_movilidad: ['', Validators.required],
      nombre_institucion: ['', Validators.required],
      nombre_convenio: ['', Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    const user = environment.user;

    if(!this.route.snapshot.data['roles'].includes(user.rol)){
      this.router.navigateByUrl(environment.unauthorizedPage);
      this.dialog.open(CustomDialogComponent, { data: { code: 403}});
    }

    this.paises = await this.PaisesService.getPais();
    this.institucionesCooperantes = await this.InstitucionCooperanteService.getInstitucionCooperante();
    this.programas = await this.ProgramasService.getProgramaAcademico();
    this.documentosId = await this.TiposDocumentosIdService.getTipoDocumentoId();
    this.tiposMovilidad = await this.TipoMovilidadService.getTipoMovilidad();
    this.convenios = await this.ConveniosService.getAllConvenios();
    const id = this.route.snapshot.queryParams._id
    this.estudiantes = await this.InscripcionEstudianteService.getAspUisPersonal(id);



    if (this.estudiantes[0]) {
      const estudiante = this.estudiantes[0];
      this.estudianteElegido = estudiante;

      this.DepartamentosService.getDepartamentos(estudiante.pais_nacimiento).then((state) => {
        this.departamentos = state
      })

      this.CiudadesService.getCiudades(estudiante.departamento).then((cities) => {
        this.ciudades = cities
      })

      this.ConveniosService.getConvenioByTipoMovilidad(estudiante.tipo_movilidad).then((convenio) => {
        this.convenios = convenio
      })

      this.formularioEditarEstudiante.controls.codigo_est.setValue(estudiante.codigo_est);
      this.formularioEditarEstudiante.controls.tipo_doc_id.setValue(estudiante.tipo_doc_id);
      this.formularioEditarEstudiante.controls.documento_id.setValue(estudiante.documento_id);
      this.formularioEditarEstudiante.controls.primer_nombre.setValue(estudiante.primer_nombre);
      this.formularioEditarEstudiante.controls.segundo_nombre.setValue(estudiante.segundo_nombre);
      this.formularioEditarEstudiante.controls.primer_apellido.setValue(estudiante.primer_apellido);
      this.formularioEditarEstudiante.controls.segundo_apellido.setValue(estudiante.segundo_apellido);
      this.formularioEditarEstudiante.controls.genero.setValue(estudiante.genero);
      this.formularioEditarEstudiante.controls.fecha_nacimiento.setValue(estudiante.fecha_nacimiento);
      this.formularioEditarEstudiante.controls.pais_nacimiento.setValue(estudiante.pais_nacimiento);
      this.formularioEditarEstudiante.controls.departamento.setValue(estudiante.departamento);
      this.formularioEditarEstudiante.controls.ciudad.setValue(estudiante.ciudad);
      this.formularioEditarEstudiante.controls.direccion.setValue(estudiante.direccion);
      this.formularioEditarEstudiante.controls.estrato.setValue(estudiante.estrato);
      this.formularioEditarEstudiante.controls.celular.setValue(estudiante.celular);
      this.formularioEditarEstudiante.controls.telefono.setValue(estudiante.telefono);
      this.formularioEditarEstudiante.controls.correo.setValue(estudiante.correo);


      this.formularioEditarEstudiante.controls.sede.setValue(estudiante.aspUisAcademic.sede);
      this.formularioEditarEstudiante.controls.programa_acad.setValue(estudiante.aspUisAcademic.programa_acad);
      this.formularioEditarEstudiante.controls.cred_cursados.setValue(estudiante.aspUisAcademic.cred_cursados);
      this.formularioEditarEstudiante.controls.cred_cursar.setValue(estudiante.aspUisAcademic.cred_cursar);
      this.formularioEditarEstudiante.controls.promedio.setValue(estudiante.aspUisAcademic.promedio);
      this.formularioEditarEstudiante.controls.periodo_inscrip.setValue(estudiante.aspUisAcademic.periodo_inscrip);
      this.formularioEditarEstudiante.controls.ano_inscrip.setValue(estudiante.aspUisAcademic.ano_inscrip);
      this.formularioEditarEstudiante.controls.fecha_inscripcion.setValue(estudiante.aspUisAcademic.fecha_inscripcion);
      this.formularioEditarEstudiante.controls.semestre.setValue(estudiante.aspUisAcademic.semestre);


      this.formularioEditarEstudiante.controls.tipo_movilidad.setValue(estudiante.inscripcion.tipo_movilidad);
      this.formularioEditarEstudiante.controls.nombre_institucion.setValue(estudiante.inscripcion.nombre_institucion);
      this.formularioEditarEstudiante.controls.nombre_convenio.setValue(estudiante.inscripcion.nombre_convenio);

    }
    console.log(this.estudiantes);

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
      segundo_nombre: editarEstudiante.segundo_nombre,
      primer_apellido: editarEstudiante.primer_apellido,
      segundo_apellido: editarEstudiante.segundo_apellido,
      genero: editarEstudiante.genero,
      fecha_nacimiento: editarEstudiante.fecha_nacimiento,
      pais_nacimiento: editarEstudiante.pais_nacimiento,
      departamento: editarEstudiante.departamento,
      ciudad: editarEstudiante.ciudad,
      direccion: editarEstudiante.direccion,
      estrato: editarEstudiante.estrato,
      telefono: editarEstudiante.telefono,
      celular: editarEstudiante.celular,
      correo: editarEstudiante.correo
    }


    const editarEstudianteAcademic = this.formularioEditarEstudiante.value;

    const aspUisAcademic = {
      codigo_est: editarEstudianteAcademic._id,
      semestre: editarEstudianteAcademic.semestre,
      promedio: editarEstudianteAcademic.promedio,
      programa_acad: editarEstudianteAcademic.programa_acad,
      cred_cursados: editarEstudianteAcademic.cred_cursados,
      cred_cursar: editarEstudianteAcademic.cred_cursar,
      periodo_inscrip: editarEstudianteAcademic.periodo_inscrip,
      ano_inscrip: editarEstudianteAcademic.ano_inscrip,
      fecha_inscripcion: editarEstudianteAcademic.fecha_inscripcion
    }

    const inscribirEstudiante = this.formularioEditarEstudiante.value;

    const inscribir = {

      tipo_movilidad: inscribirEstudiante.tipo_movilidad,
      nombre_institucion: inscribirEstudiante.nombre_institucion,
      nombre_convenio: inscribirEstudiante.nombre_convenio,
      codigo_est: inscribirEstudiante.codigo_est

    }

    const aspUisPersonalGuardado = await this.InscripcionEstudianteService.UpdateAspUisPersonal(aspUisPersonal, this.estudianteElegido._id);
    const aspUisAcademicoGuardado = await this.InscripcionEstudianteService.updateAspUisAcademic(aspUisAcademic, this.estudianteElegido.aspUisAcademic._id);
    const inscritoGuardado = await this.InscripcionEstudianteService.updateInscripcion(inscribir, this.estudianteElegido.inscripcion._id);
    this.dialog.open(CustomDialogComponent, { data: { code: 211}});

    this.dialog.open(CustomDialogComponent, { data: {title: 'Actualizado!', message: 'Datos actualizados correctamente!', type: 'alert'}});

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
    this.ConveniosService.getConvenioByTipoMovilidad(tipo_movilidad).then((convenio) => {
      this.convenios = convenio
    })
  }

  public cancelar(){
    this.router.navigateByUrl('/estudiantes-movilidad');
  }

}
