import { Component, OnInit } from '@angular/core';
import { ConvocatoriaService } from './../../services/convocatoria.service';
import { ProfesoresService } from './../../services/profesores.service';
import { Router } from '@angular/router';
import { TiposDocumentosIdService } from './../../services/tipos-documentos-id.service';


@Component({
  selector: 'app-profesores-modulo',
  templateUrl: './profesores-modulo.component.html',
  styleUrls: ['./profesores-modulo.component.css']
})
export class ProfesoresModuloComponent implements OnInit {

  public convocatorias: any;
  public profesores: any;
  public tiposDocumento: any;


  constructor(
   private ProfesoresService: ProfesoresService,
   private  ConvocatoriaService: ConvocatoriaService,
   private TiposDocumentosIdService: TiposDocumentosIdService,
   private router: Router,
   ) { }

   async ngOnInit(): Promise<void> {
     this.convocatorias = await this.ConvocatoriaService.getConvocatorias();
     this.profesores = await this.ProfesoresService.getAllProfesores();
    }

   public editarProfesor(id: any) {
    this.router.navigateByUrl('/editar-inscripcion?_id=' + id);
  }
    

}
