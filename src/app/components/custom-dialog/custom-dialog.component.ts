import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string, title: string, type: string, code: number}) { }
  public content: any ;

  private messages = [

    {code: 200, message: 'Solicitud enviada correctamente', title: 'INFO', type: 'info'},
    {code: 201, message: 'Creado correctamente', title: 'Nuevo registro'},
    {code: 210, message: 'No pudo ser creado', title: 'EROR', type: 'info'},
    {code: 211, message: 'Datos actualizados correctamente', title: 'ACTUALIZADO', type: 'info'},
    {code: 212, message: 'No pudo ser actualizado', title: 'ERROR', type: 'warning'},
    {code: 213, message: 'No pudo ser eliminado', title: 'ERROR', type: 'warning'},
    {code: 214, message: 'Eliminado correctamente', title: 'ELIMINADO', type: 'danger'},
    {code: 215, message: 'Los datos han sido guardados y el usuario ha sido inscrito', title: 'Guardado e inscrito'},
    {code: 216, message: 'Los datos han sido guardados pero el usuario no cumple con los requerimientos del convenio', title: 'No inscrito'},
    {code: 405, message: 'Seleccione Un Archivo Valido', title: 'INFO', type: 'alert' },
    {code: 403, message: 'Permisos insuficientes!', title: 'Acceso denegado', type: 'warning'},

  ];

  ngOnInit(): void {
    if(this.data.code){
      this.content = this.messages.find(x => x.code === this.data.code) || {message: '', title: '', type: 'info'}
      //this.content.message += ' \n' + this.data.message
      if(this.data.message){
        this.content.message += ' \n' + this.data.message
      }
    }else{
      this.content = this.data
    }
  }

}
