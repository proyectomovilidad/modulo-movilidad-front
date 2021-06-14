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
    {code: 403, message: 'Permisos insuficientes!', title: 'PROHIBIDO', type: 'warning'},
    {code: 201, message: 'Creado correctamente', title: 'INFO', type: 'info'},
    {code: 210, message: 'No pudo ser creado', title: 'INFO', type: 'info'},
    {code: 211, message: 'Actualizado correctamente', title: 'INFO', type: 'info'},
    {code: 212, message: 'No pudo ser actualizado', title: 'INFO', type: 'warning'},
    {code: 213, message: 'No pudo ser eliminado', title: 'INFO', type: 'warning'},
    {code: 214, message: 'Eliminado correctamente', title: 'INFO', type: 'danger'},

  ];

  ngOnInit(): void {
    if(this.data.code){
      this.content = this.messages.find(x => x.code === this.data.code) || {message: '', title: '', type: 'info'}
      this.content.message += ' \n' + this.data.message
    }else{
      this.content = this.data
    }
  }

}
