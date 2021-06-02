import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitudApoyoService } from './../../services/solicitud-apoyo.service';
import { TipoApoyoService } from './../../services/tipo-apoyo.service';




@Component({
  selector: 'app-solicitud-apoyos',
  templateUrl: './solicitud-apoyos.component.html',
  styleUrls: ['./solicitud-apoyos.component.css']
})
export class SolicitudApoyosComponent implements OnInit {

  public tiposApoyo: any;
  public formularioSolicitudApoyos: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public SolicitudApoyoService: SolicitudApoyoService,
    public TipoApoyoService: TipoApoyoService,


   ) { 
      
      this.formularioSolicitudApoyos = this.formBuilder.group({

        tipo_apoyo: ['', Validators.required],
        entidad_financiera: ['', Validators.required],
        fecha_solicitud: [Date, Validators.required],
        numero_cuenta: [0, Validators.required],
        tipo_cuenta: ['', Validators.required],
      }); 
  }

  async ngOnInit(): Promise<void> {
    this.tiposApoyo = await this.TipoApoyoService.getApoyo();
  }

  
  getNoValido(input: string) {
    return this.formularioSolicitudApoyos.get(input).invalid && 
    this.formularioSolicitudApoyos.get(input).touched;
  }

  async guardarFormulario(){
    if (this.formularioSolicitudApoyos.invalid) {
      return Object.values(this.formularioSolicitudApoyos.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    const crearSolicitudApoyos = this.formularioSolicitudApoyos.value;
    console.log(crearSolicitudApoyos)

    const solicitudApoyo = {

      tipo_apoyo:  crearSolicitudApoyos.tipo_apoyo,
      entidad_financiera: crearSolicitudApoyos.entidad_financiera ,
      fecha_solicitud: crearSolicitudApoyos.fecha_solicitud ,
      numero_cuenta: crearSolicitudApoyos.numero_cuenta ,
      tipo_cuenta:crearSolicitudApoyos.tipo_cuenta
     
    }

    const solicitudApoyoGuardado = await this.SolicitudApoyoService.saveSolicitudApoyo(solicitudApoyo);
    console.log(solicitudApoyoGuardado);


    
    this.formularioSolicitudApoyos.reset();
  }

  

}
