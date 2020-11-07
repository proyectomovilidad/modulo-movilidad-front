import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InscripcionEstudianteService } from './../../services/inscripcion-estudiante.service';
import { PaisesService } from './../../services/paises.service';
import { DepartamentosService } from './../../services/departamentos.service';
import { CiudadesService } from './../../services/ciudades.service';
import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
import { ProgramaAcademicoService } from './../../services/programa-academico.service';

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
  public programas : any;

  public formularioInscripcionEstudiante: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public InscripcionEstudianteService: InscripcionEstudianteService,
    public PaisesService: PaisesService,
    public DepartamentosService: DepartamentosService,
    public CiudadesService: CiudadesService,
    public InstitucionCooperanteService: InstitucionCooperanteService,
    public ProgramaAcademicoService: ProgramaAcademicoService,
  ) 
  
  {
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
      estrato: [0, Validators.required],
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
    this.ciudades = await this.CiudadesService.getCiudad();
    this.paises = await this.PaisesService.getPais();
    this.departamentos = await this.DepartamentosService.getDepartamento();
    this.institucionesCooperantes = await this.InstitucionCooperanteService.getInstitucionCooperante();
    this.programas = await this.ProgramaAcademicoService.getProgramaAcademico();


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
      celular: inscribirEstudiante.celular,
      correo: inscribirEstudiante.correo
    }


    const inscribirEstudianteAcademic = this.formularioInscripcionEstudiante.value;
  
    const aspUisAcademic = {
      codigo_est: inscribirEstudianteAcademic.codigo_est,
      semestre: inscribirEstudianteAcademic.semestre ,      
      promedio:inscribirEstudianteAcademic.promedio,
      programa_acad: inscribirEstudianteAcademic.programa_acad,
      cred_cursados: inscribirEstudianteAcademic.cred_cursados,
      cred_cursar: inscribirEstudianteAcademic.cred_cursar ,
      periodo_inscrip: inscribirEstudianteAcademic.periodo_inscrip ,
      ano_inscrip: inscribirEstudianteAcademic.ano_inscrip  ,
      fecha_inscripcion: inscribirEstudianteAcademic.fecha_inscripcion 
    }

    const aspUisPersonalGuardado = await this.InscripcionEstudianteService.saveAspUisPersonal(aspUisPersonal);
    console.log(aspUisPersonalGuardado);

    const aspUisAcademicGuardado = await this.InscripcionEstudianteService.saveAspUisAcademic(aspUisAcademic);
    console.log(aspUisAcademicGuardado);
    
    this.formularioInscripcionEstudiante.reset();
  }
}
