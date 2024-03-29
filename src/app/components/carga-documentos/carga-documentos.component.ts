import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { InscripcionEstudianteService } from 'src/app/services/inscripcion-estudiante.service';
import { TipoDocumentoService } from './../../services/tipo-documento.service';
import { CargaDocumentoService } from './../../services/carga-documento.service';
import { environment } from 'src/environments/environment';
import {MatDialog} from '@angular/material/dialog';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';


@Component({
  selector: 'app-carga-documentos',
  templateUrl: './carga-documentos.component.html',
  styleUrls: ['./carga-documentos.component.css']
})
export class CargaDocumentosComponent implements OnInit {

  public formularioDocumentos: FormGroup;
  public estudiantes: any;
  public documentos: any = [];
  public estudiante: any;
  file: File;
  mensajeErr: any;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,

              private inscripcionEstudianteService: InscripcionEstudianteService,
              private TipoDocumentoService: TipoDocumentoService,
              private CargaDocumentoService: CargaDocumentoService,
  ) {

    this.crearCampo();

  }

  async ngOnInit(): Promise<void> {
    const user = environment.user;

    if(user.Inscripcion.estado !== '2' || !this.route.snapshot.data['roles'].includes(user.rol)){
      this.router.navigateByUrl(environment.unauthorizedPage);
      this.dialog.open(CustomDialogComponent, { data: { code: 403}});
    }

    this.estudiante = environment.user
    this.inscripcionEstudianteService.getAllAspUisPersonal().then(resp=>{
      if(resp.status){
        //this.estudiante = resp.data
        this.getDocumentos()
      }
    });
    //this.documentos = await this.TipoDocumentoService.getDocumento();
  }

  get campo() {
    return this.formularioDocumentos.get('campo') as FormArray;
  }

  public cargarDatos(id: any) {
  }

  getDocumentos(){
    console.log('url: ',this.estudiante)
    this.TipoDocumentoService.getDocumentoByConvenio(this.estudiante.Inscripcion.nombre_convenio).then(resp=>{
      console.log('respuesta: ', resp)
      if(resp.status){
        resp.data.forEach(element => {
          const fileName = `${this.estudiante.Inscripcion._id}-${element._id}`
          this.CargaDocumentoService.existsDocumento(fileName).then(resp => {
            element.existe = resp.existsFile;
          })
          this.documentos.push(element)
        })
      }
    });
  }

  saveFile(e, indid, tipoDocumentoId){
    let formData = new FormData()
    this.file = e.target.files[0]

    let extension = this.file.name.split('.').pop()

    if(['pdf', 'PDF'].includes(extension) ){
      //se agrega el archivo subido a un formulario
      //              |campo| |archivo|  |nombre de archivo|
      formData.append('file', this.file, `${this.estudiante.Inscripcion._id}-${tipoDocumentoId}.${extension}` )

      this.CargaDocumentoService.saveDocumentoFile(formData).then(res=>{
        console.log(res)
        let code = res.status === true ? 201 : 210;
        this.dialog.open(CustomDialogComponent, { data: { code: code}});

      })
      this.mensajeErr = ''
    }else{
      this.dialog.open(CustomDialogComponent, { data: { code: 405}});
      this.mensajeErr = "seleccione un archivo valido"
      console.log("archivo no es valido")
    }

  }


  crearCampo(){
    this.formularioDocumentos = this.formBuilder.group ({

      campo: this.formBuilder.array([
      ])
    });
  }


  agregarCampo() {
    this.campo.push(this.formBuilder.control('', Validators.required) );
  }

  eliminarDocumento(inscripcionId, tipoDocumentoId){
    const fileName = `${this.estudiante.Inscripcion._id}-${tipoDocumentoId}.pdf`
    this.CargaDocumentoService.eliminarDocumentoByNombre(fileName).then(resp=>{
      console.log(resp)
    })
  }

  eliminarCampo( i : number) {

    this.campo.removeAt(i);

  }

  async existeDocumeto(file){
    let existe = false;
    const fileName = `${this.estudiante.Inscripcion._id}-${file}`

    this.CargaDocumentoService.existsDocumento(fileName).then(resp => {
      existe = resp.existsFile;
    })
    return existe;
  }




}

