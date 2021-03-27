import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoDocumentoService } from './../../services/tipo-documento.service';
import { TipoMovilidadService } from './../../services/tipo-movilidad.service';
import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { InscripcionEstudianteService } from './../../services/inscripcion-estudiante.service';
import { InscripcionExternoService } from './../../services/inscripcion-externo.service';

@Component({
  selector: 'app-consultar-documentos',
  templateUrl: './consultar-documentos.component.html',
  styleUrls: ['./consultar-documentos.component.css']
})
export class ConsultarDocumentosComponent implements OnInit {

  public tiposMovilidad: any;
  public instituciones: any;
  public formularioDocumentos: FormGroup;
  public estudiantes: any;
  public externos: any;

  public documentos: any; 

  constructor(private router: Router,
    private TipoDocumentoService: TipoDocumentoService,
    private InscripcionEstudianteService: InscripcionEstudianteService,
    private InscripcionExternoService: InscripcionExternoService
    ) { }

    async ngOnInit(): Promise<void> {
      this.estudiantes = await this.InscripcionEstudianteService.getAllAspUisPersonal();
      this.externos = await this.InscripcionExternoService.getAllAspExternoPersonal();
    }

    public revisarDocumento(id: any) {
      this.router.navigateByUrl('/revision-documentos?_id=' + id);
    }
      

}
