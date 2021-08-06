import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EntornoMovilidadService} from '../../services/entorno-movilidad.service';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';


@Component({
  selector: 'app-editar-entorno-movilidad',
  templateUrl: './editar-entorno-movilidad.component.html',
  styleUrls: ['./editar-entorno-movilidad.component.css']
})
export class EditarEntornoMovilidadComponent implements OnInit {

  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute,
               private entornoMovilidadService: EntornoMovilidadService,
               private router: Router,
  ) {
    this.formEntorno = this.formBuilder.group({
      fecha_inicio_movilidad: [Date, Validators.required],
      fecha_final_movilidad: [Date, Validators.required],
      periodo: []
    })
  }

  public formEntorno: FormGroup;
  private id = this.route.snapshot.queryParams._id;
  private tipo_e:any

  ngOnInit(): void {
    this.entornoMovilidadService.getEntornoMovilidadById(this.id).then( resp => {
      console.log('aca', resp)
      if ( resp.status == true ) {
        this.tipo_e = resp.data.tipo
        console.log(resp.data.fecha_final)
        this.formEntorno.controls.fecha_inicio_movilidad.setValue(new Date(resp.data.fecha_inicio) )
        this.formEntorno.controls.fecha_final_movilidad.setValue(new Date(resp.data.fecha_final))
        this.formEntorno.controls.periodo.setValue(resp.data.periodo)
      } 
    } )
  }

  public actualizar() {
    if (this.formEntorno.invalid) {
      return Object.values(this.formEntorno.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    const dataFrom = this.formEntorno.value

    const dataEntorno = {
      fecha_inicio: dataFrom.fecha_inicio_movilidad,
      fecha_final: dataFrom.fecha_final_movilidad,
      periodo: dataFrom.periodo,
      tipo: this.tipo_e
    }
    console.log(dataFrom)

    this.entornoMovilidadService.updateEntornoMovilidad(this.id, dataEntorno). then( resp => {
      console.log(resp)
    })
  }

  public regresar() {
    this.router.navigateByUrl('/entorno-movilidad');
  }

  getNoValido(input: string) {
    return this.formEntorno.get(input).invalid &&
      this.formEntorno.get(input).touched;
  }
}
