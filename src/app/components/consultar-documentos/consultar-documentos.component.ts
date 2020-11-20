import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoDocumentoService } from './../../services/tipo-documento.service';


@Component({
  selector: 'app-consultar-documentos',
  templateUrl: './consultar-documentos.component.html',
  styleUrls: ['./consultar-documentos.component.css']
})
export class ConsultarDocumentosComponent implements OnInit {

  public documentos: any;

  constructor(private router: Router,
    private TipoDocumentoService: TipoDocumentoService
    ) { }

    async ngOnInit(): Promise<void> {
      this.documentos = await this.TipoDocumentoService.getDocumento();
    }

    public editarDocumento(id: any) {
      this.router.navigateByUrl('/editar-documento?_id=' + id);
    }
      

}
