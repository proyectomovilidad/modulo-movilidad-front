import { Component, OnInit } from '@angular/core';
import { TipoMovilidadService } from './../../services/tipo-movilidad.service';
import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
@Component({
  selector: 'app-estudiantes-movilidad',
  templateUrl: './estudiantes-movilidad.component.html',
  styleUrls: ['./estudiantes-movilidad.component.css']
})
export class EstudiantesMovilidadComponent implements OnInit {

  public tiposMovilidad: any;
  public instituciones: any;

  constructor(
    public TipoMovilidadService: TipoMovilidadService,
    public InstitucionCooperanteService: InstitucionCooperanteService,
  ) { }

  async ngOnInit(): Promise<void> {

    this.tiposMovilidad = await this.TipoMovilidadService.getTipoMovilidad();
    this.instituciones = await this.InstitucionCooperanteService.getInstitucionCooperante();

        
  }

}
