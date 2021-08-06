import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CargaDocumentoService {
  public url: String;

  constructor(private httpClient: HttpClient) { }

  public saveDocumentoFile(formData): Promise<any> {
    const url = `${environment.backend.cargaDocumento}saveDocumentoFile/`
    return this.httpClient.post<any>(url,formData, this.getHeaders()).toPromise()
  }

  public getDocumentosByNombre(fileName, rename){
  	const url = `${environment.backend.cargaDocumento}getDocumentosByNombre/${fileName}/${rename}`
    window.open(url, '_blank');
  	//return this.httpClient.get<any>(url, this.getHeaders()).toPromise()
  }

  public eliminarDocumentoByNombre(fileName): Promise<any>{
  	const url = `${environment.backend.cargaDocumento}eliminarDocumentoByNombre/${fileName}`
  	return this.httpClient.post<any>(url,{}, this.getHeaders()).toPromise()
  }

  public  existsDocumento(fileName): Promise<any>{
    const url = `${environment.backend.cargaDocumento}existsDocumento/${fileName}`
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise()
  }


  private getHeaders(): any{
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${environment.TOKEN}`,
        'ContentType': 'application/json'
      })
    };
    return httpOptions
  }


}
