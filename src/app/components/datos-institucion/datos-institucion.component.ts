import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-institucion',
  templateUrl: './datos-institucion.component.html',
  styleUrls: ['./datos-institucion.component.css']
})
export class DatosInstitucionComponent implements OnInit {

  public instituciones: any;

  constructor() { }

  ngOnInit(): void {
  }

}
