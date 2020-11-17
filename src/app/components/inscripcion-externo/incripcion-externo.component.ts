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
  


  public formularioInscripcionExterno: FormGroup;
  constructor(private formBuilder: FormBuilder,
    public InscripcionExternoService: InscripcionExternoService,
    public PaisesService: PaisesService,
    public DepartamentosService: DepartamentosService,
    public CiudadesService: CiudadesService,
    public InstitucionCooperanteService: InstitucionCooperanteService,
    public ProgramasService: ProgramasService,
    public TiposDocumentosIdService: TiposDocumentosIdService,
    public TipoMovilidadService: TipoMovilidadService,
    
    ) { 

      this.formularioInscripcionExterno = this.formBuilder.group({
        
        tipo_doc_id: ['', Validators.required],
        documento_id: [0, Validators.required],
        primer_nombre: ['', Validators.required],
        primer_apellido: ['', Validators.required],
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
        correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        tipo_movilidad: ['', Validators.required],
        nombre_institucion: ['', Validators.required]
        

      });
  
    }

  async ngOnInit(): Promise<void>  {
    this.paises = await this.PaisesService.getPais();
    this.institucionesCooperantes = await this.InstitucionCooperanteService.getInstitucionCooperante();
    this.programas = await this.ProgramasService.getProgramaAcademico();
    this.documentosId = await this.TiposDocumentosIdService.getTipoDocumentoId();
    this.tiposMovilidad = await this.TipoMovilidadService.getTipoMovilidad();
  }
 
 
  getNoValido(input: string) {
    return this.formularioInscripcionExterno.get(input).invalid && 
    this.formularioInscripcionExterno.get(input).touched;
  }

 async guardarFormulario() {
    if (this.formularioInscripcionExterno.invalid) {
      return Object.values(this.formularioInscripcionExterno.controls).forEach(control => {
        control.markAsTouched();
      });   
    }

    const inscribirExterno = this.formularioInscripcionExterno.value;
    console.log(inscribirExterno)

    const aspExtPersonal = { 

      tipo_doc_id: inscribirExterno.tipo_doc_id,
      documento_id: inscribirExterno.documento_id,
      primer_nombre: inscribirExterno.primer_nombre,
      primer_apellido:inscribirExterno.primer_apellido,
      genero:inscribirExterno.genero,
      fecha_nacimiento:inscribirExterno.fecha_nacimiento,
      pais_nacimiento:inscribirExterno.pais_nacimiento,
      pais_res:inscribirExterno.pais_res,
      departamento:inscribirExterno.departamento,
      ciudad: inscribirExterno.ciudad,
      direccion: inscribirExterno.direccion,
      celular:inscribirExterno.celular,
      correo:inscribirExterno.correo,
    }

    const inscribirExternoAcademic = this.formularioInscripcionExterno.value;

    const aspExtAcademic = {
     
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


    const aspExtPersonalGuardado = await this.InscripcionExternoService.saveAspExtPersonal(aspExtPersonal);
    console.log(aspExtPersonalGuardado);

    const aspExtAcademicGuardado = await this.InscripcionExternoService.saveAspExtAcademic(aspExtAcademic);
    console.log(aspExtAcademicGuardado);

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

}
