import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InscripcionExternoService {

  public url: String;

  constructor( private httpClient: HttpClient) { }


  public saveAspExtPersonal(aspExtPersonal: any): Promise<any> {
    const url = `${environment.backend.aspExtPersonal}`;

    return this.httpClient.post<any>(url, aspExtPersonal, this.getHeaders()).toPromise();
  }

  public saveAspExtAcademic(aspExtAcademic: any): Promise<any> {
    const url = `${environment.backend.aspExtAcademic}`;

    return this.httpClient.post<any>(url, aspExtAcademic, this.getHeaders()).toPromise();
  }

 
  public saveInscripcion(inscripcion: any): Promise<any> {
    const url = `${environment.backend.inscripcion}`;

    return this.httpClient.post<any>(url, inscripcion, this.getHeaders()).toPromise();
  }

  public getAspExternoPersonal(_id: any): Promise<any> {
    const url = `${environment.backend.aspExtPersonal}getAspExtPersonalById/${_id}`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public getAspExternoAcademic(_id: any): Promise<any> {
   const url = `${environment.backend.aspExtAcademic}getAspExtAcademicById/${_id}`;
   //const url = `${environment.backend.aspUisAcademic}getAspExtAcademicById/:_id`; 
   return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public getAllAspExternoPersonal(): Promise<any> {
    const url = `${environment.backend.aspExtPersonal}getAspiranteExtPersonal/`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public getAllAspExternoAcademic(): Promise<any> {
    const url = `${environment.backend.aspExtAcademic}getAspiranteExtAcademic/`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  
  public UpdateAspExtPersonal(aspExtPersonal: any, _id: any): Promise<any> {
    const url = `${environment.backend.aspExtPersonal}${_id}`;

    return this.httpClient.post<any>(url, aspExtPersonal, this.getHeaders()).toPromise();
  } 

  public updateAspExtAcademic(aspExtAcademic: any, _id: any): Promise<any> {
    const url = `${environment.backend.aspExtAcademic}/${_id}`;

    return this.httpClient.post<any>(url, aspExtAcademic, this.getHeaders()).toPromise();
  }

  public updateInscripcion(inscripcion: any, _id: any): Promise<any> {
    const url = `${environment.backend.inscripcion}/${_id}`;

    return this.httpClient.post<any>(url, inscripcion, this.getHeaders()).toPromise();
  }

  public deleteInscripcion( _id: any): Promise<any> {
    const url = `${environment.backend.aspExtAcademic}deleteAspiranteExtAcademicById/${_id}`;

    return this.httpClient.delete<any>(url, this.getHeaders()).toPromise();
  }

  public getAspirantesExtPersonal(): Promise<any> {
    const url = `${environment.backend.aspExtPersonal}getAspirantesExtPersonal/`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public consultarExternos(consulta) {
    const url = `${environment.backend.aspExtPersonal}consultarExternos/`;

    return this.httpClient.post<any>(url, consulta, this.getHeaders()).toPromise();

  }

  public cambiarEstadoInscripcionById(estado, id): Promise<any>{
   const url = `${environment.backend.inscripcion}cambiarEstadoInscripcionById/${id}`;
   
   return this.httpClient.post<any>(url, estado, this.getHeaders()).toPromise();
  
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
