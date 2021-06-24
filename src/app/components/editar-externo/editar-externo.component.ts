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
import { ConvocatoriaComponent } from './../convocatoria/convocatoria.component';
import { ConveniosService } from './../../services/convenios.service';
import { InscripcionExternoService } from './../../services/inscripcion-externo.service';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../../../environments/environment';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-editar-externo',
  templateUrl: './editar-externo.component.html',
  styleUrls: ['./editar-externo.component.css']
})
export class EditarExternoComponent implements OnInit {

  public ciudades: any;
  public paises: any;
  public departamentos: any;
  public institucionesCooperantes: any;
  public programas: any;
  public documentosId: any;
  public tiposMovilidad: any;
  public externos: any;
  public academics: any;
  public externoElegido: any;
  public convenios: any;

  public formularioEditarExterno: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public PaisesService: PaisesService,
    public DepartamentosService: DepartamentosService,
    public CiudadesService: CiudadesService,
    public InstitucionCooperanteService: InstitucionCooperanteService,
    public ProgramasService: ProgramasService,
    public TiposDocumentosIdService: TiposDocumentosIdService,
    public TipoMovilidadService: TipoMovilidadService,
    public InscripcionExternoService: InscripcionExternoService,
    public ConveniosService: ConveniosService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
  ) {

    this.formularioEditarExterno = this.formBuilder.group({

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
    this.externos = await this.InscripcionExternoService.getAspExternoPersonal(id);


    if (this.externos[0]) {
      const externo = this.externos[0];
      this.externoElegido = externo;

      this.DepartamentosService.getDepartamentos(externo.pais_res).then((state) => {
        this.departamentos = state
      })

      this.CiudadesService.getCiudades(externo.departamento).then((cities) => {
        this.ciudades = cities
      })

      this.ConveniosService.getConvenioByTipoMovilidad(externo.tipo_movilidad).then((convenio) => {
        this.convenios = convenio
      })

      this.formularioEditarExterno.controls.tipo_doc_id.setValue(externo.tipo_doc_id);
      this.formularioEditarExterno.controls.documento_id.setValue(externo.documento_id);
      this.formularioEditarExterno.controls.primer_nombre.setValue(externo.primer_nombre);
      this.formularioEditarExterno.controls.segundo_nombre.setValue(externo.segundo_nombre);
      this.formularioEditarExterno.controls.primer_apellido.setValue(externo.primer_apellido);
      this.formularioEditarExterno.controls.segundo_apellido.setValue(externo.segundo_apellido);
      this.formularioEditarExterno.controls.genero.setValue(externo.genero);
      this.formularioEditarExterno.controls.fecha_nacimiento.setValue(externo.fecha_nacimiento);
      this.formularioEditarExterno.controls.pais_nacimiento.setValue(externo.pais_nacimiento);
      this.formularioEditarExterno.controls.pais_res.setValue(externo.pais_res);
      this.formularioEditarExterno.controls.departamento.setValue(externo.departamento);
      this.formularioEditarExterno.controls.ciudad.setValue(externo.ciudad);
      this.formularioEditarExterno.controls.direccion.setValue(externo.direccion);
      this.formularioEditarExterno.controls.celular.setValue(externo.celular);
      this.formularioEditarExterno.controls.correo.setValue(externo.correo);
      this.formularioEditarExterno.controls.telefono.setValue(externo.telefono);

      this.formularioEditarExterno.controls.programa_acad.setValue(externo.aspExtAcademic.programa_acad);
      this.formularioEditarExterno.controls.cred_cursados.setValue(externo.aspExtAcademic.cred_cursados);
      this.formularioEditarExterno.controls.cred_cursar.setValue(externo.aspExtAcademic.cred_cursar);
      this.formularioEditarExterno.controls.promedio.setValue(externo.aspExtAcademic.promedio);
      this.formularioEditarExterno.controls.periodo_inscrip.setValue(externo.aspExtAcademic.periodo_inscrip);
      this.formularioEditarExterno.controls.ano_inscrip.setValue(externo.aspExtAcademic.ano_inscrip);
      this.formularioEditarExterno.controls.fecha_inscripcion.setValue(externo.aspExtAcademic.fecha_inscripcion);
      this.formularioEditarExterno.controls.semestre.setValue(externo.aspExtAcademic.semestre);
      this.formularioEditarExterno.controls.prog_acad_uis.setValue(externo.aspExtAcademic.prog_acad_uis);

      this.formularioEditarExterno.controls.tipo_movilidad.setValue(externo.inscripcion.tipo_movilidad);
      this.formularioEditarExterno.controls.nombre_institucion.setValue(externo.inscripcion.nombre_institucion);
      this.formularioEditarExterno.controls.nombre_convenio.setValue(externo.inscripcion.nombre_convenio);






    }


  }

  getNoValido(input: string) {
    return this.formularioEditarExterno.get(input).invalid &&
      this.formularioEditarExterno.get(input).touched;
  }

  async guardarFormulario() {
    if (this.formularioEditarExterno.invalid) {
      return Object.values(this.formularioEditarExterno.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const editarExternoPersonal = this.formularioEditarExterno.value;

    const aspExtPersonal = {

      tipo_doc_id: editarExternoPersonal.tipo_doc_id,
      documento_id: editarExternoPersonal.documento_id,
      primer_nombre: editarExternoPersonal.primer_nombre,
      segundo_nombre: editarExternoPersonal.segundo_nombre,
      primer_apellido: editarExternoPersonal.primer_apellido,
      segundo_apellido: editarExternoPersonal.segundo_apellido,
      genero: editarExternoPersonal.genero,
      fecha_nacimiento: editarExternoPersonal.fecha_nacimiento,
      pais_nacimiento: editarExternoPersonal.pais_nacimiento,
      pais_res: editarExternoPersonal.pais_res,
      departamento: editarExternoPersonal.departamento,
      ciudad: editarExternoPersonal.ciudad,
      direccion: editarExternoPersonal.direccion,
      celular: editarExternoPersonal.celular,
      telefono: editarExternoPersonal.telefono,
      correo: editarExternoPersonal.correo,
    }

    const editarExternoAcademic = this.formularioEditarExterno.value;

    const aspExtAcademic = {

      documento_id: editarExternoAcademic.documento_id,
      semestre: editarExternoAcademic.semestre,
      promedio: editarExternoAcademic.promedio,
      programa_acad: editarExternoAcademic.programa_acad,
      cred_cursados: editarExternoAcademic.cred_cursados,
      cred_cursar: editarExternoAcademic.cred_cursar,
      periodo_inscrip: editarExternoAcademic.periodo_inscrip,
      ano_inscrip: editarExternoAcademic.ano_inscrip,
      nombre_institucion: editarExternoAcademic.nombre_institucion,
      fecha_inscripcion: editarExternoAcademic.fecha_inscripcion,
      prog_acad_uis: editarExternoAcademic.prog_acad_uis
    }

    const inscribirExterno = this.formularioEditarExterno.value;

    const inscribir = {

      tipo_movilidad: inscribirExterno.tipo_movilidad,
      nombre_institucion: inscribirExterno.nombre_institucion,
      nombre_convenio: inscribirExterno.nombre_convenio,
      documento_id: inscribirExterno.documento_id,
    }

    const aspExtPersonalGuardado = await this.InscripcionExternoService.UpdateAspExtPersonal(aspExtPersonal, this.externoElegido._id);
    const aspExtAcademicoGuardado = await this.InscripcionExternoService.updateAspExtAcademic(aspExtAcademic, this.externoElegido.aspExtAcademic._id);
    const inscritoGuardado = await this.InscripcionExternoService.updateInscripcion(inscribir, this.externoElegido.inscripcion._id);

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


}
