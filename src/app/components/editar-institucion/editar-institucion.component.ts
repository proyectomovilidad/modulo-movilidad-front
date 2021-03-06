import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaisesService } from './../../services/paises.service';
import { DepartamentosService } from './../../services/departamentos.service';
import { CiudadesService } from './../../services/ciudades.service';
import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InscripcionEstudianteService } from 'src/app/services/inscripcion-estudiante.service';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-editar-institucion',
  templateUrl: './editar-institucion.component.html',
  styleUrls: ['./editar-institucion.component.css']
})
export class EditarInstitucionComponent implements OnInit {


  public paises: any;
  public departamentos: any;
  public ciudades: any;
  public instituciones: any;
  public institucionElegida: any;
  public formularioEditarInstitucionCooperante: FormGroup;

  constructor(
   private router: Router,
   private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public InstitucionCooperanteService: InstitucionCooperanteService,
    public PaisesService: PaisesService,
    public DepartamentosService: DepartamentosService,
    public CiudadesService: CiudadesService,
    public InscripcionEstudianteService: InscripcionEstudianteService,
    public dialog: MatDialog
  ) {
    this.formularioEditarInstitucionCooperante = this.formBuilder.group({
      nombre_institucion: ['', Validators.required],
      pais: ['', Validators.required],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: [0, Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
  }

  async ngOnInit(): Promise<void> {
    const user = environment.user;

    if(!this.route.snapshot.data['roles'].includes(user.rol)){
      this.router.navigateByUrl(environment.unauthorizedPage);
      this.dialog.open(CustomDialogComponent, { data: { code: 403}});
    }

    this.paises =  await this.PaisesService.getPais();

    const id = this.route.snapshot.queryParams._id
    this.instituciones = await this.InstitucionCooperanteService.getInstitucionCooperanteById(id);

    if(this.instituciones[0]){
      const institucion = this.instituciones[0];
      this.institucionElegida = institucion;
      // datos departamento y ciudad
      this.onOptionsSelectedDepartment(institucion.pais);
      this.onOptionsSelectedCity(institucion.departamento);

      this.formularioEditarInstitucionCooperante.controls.nombre_institucion.setValue(institucion.nombre_institucion);
      this.formularioEditarInstitucionCooperante.controls.pais.setValue(institucion.pais);
      this.formularioEditarInstitucionCooperante.controls.departamento.setValue(institucion.departamento);
      this.formularioEditarInstitucionCooperante.controls.ciudad.setValue(institucion.ciudad);
      this.formularioEditarInstitucionCooperante.controls.direccion.setValue(institucion.direccion);
      this.formularioEditarInstitucionCooperante.controls.telefono.setValue(institucion.telefono);
      this.formularioEditarInstitucionCooperante.controls.email.setValue(institucion.email);

    }


  }


  getNoValido(input: string) {
    return this.formularioEditarInstitucionCooperante.get(input).invalid &&
      this.formularioEditarInstitucionCooperante.get(input).touched;
  }

  async guardarFormularioEditado() {
    if (this.formularioEditarInstitucionCooperante.invalid) {
      return Object.values(this.formularioEditarInstitucionCooperante.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    const editarInstitucionCooperante = this.formularioEditarInstitucionCooperante.value;
    console.log(editarInstitucionCooperante)

    const institucionCooperante = {

      nombre_institucion: editarInstitucionCooperante.nombre_institucion,
      pais: editarInstitucionCooperante.pais,
      departamento: editarInstitucionCooperante.departamento,
      ciudad: editarInstitucionCooperante.ciudad,
      direccion: editarInstitucionCooperante.direccion,
      telefono: editarInstitucionCooperante.telefono,
      email: editarInstitucionCooperante.email

    }

    const institucionCooperanteEditado = await this.InstitucionCooperanteService.updateInstitucionCooperante(institucionCooperante, this.institucionElegida._id);
    console.log(institucionCooperanteEditado);
    let code = institucionCooperanteEditado._id ? 211 : 212;
    this.dialog.open(CustomDialogComponent, { data: { code: code, message: institucionCooperanteEditado.message}});

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

  regresar() {
    this.router.navigateByUrl('/institucion-cooperante');
  }

}
