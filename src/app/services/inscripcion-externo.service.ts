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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, aspExtPersonal, httpOptions).toPromise();
  }

  public saveAspExtAcademic(aspExtAcademic: any): Promise<any> {
    const url = `${environment.backend.aspExtAcademic}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, aspExtAcademic, httpOptions).toPromise();
  }

 
  public saveInscripcion(inscripcion: any): Promise<any> {
    const url = `${environment.backend.inscripcion}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, inscripcion, httpOptions).toPromise();
  }

  public getAspExternoPersonal(_id: any): Promise<any> {
    const url = `${environment.backend.aspExtPersonal}getAspExtPersonalById/${_id}`;
    return this.httpClient.get<any>(url).toPromise();
  }

  public getAspExternoAcademic(_id: any): Promise<any> {
   const url = `${environment.backend.aspExtAcademic}getAspExtAcademicById/${_id}`;
   //const url = `${environment.backend.aspUisAcademic}getAspExtAcademicById/:_id`; 
   return this.httpClient.get<any>(url).toPromise();
  }

  public getAllAspExternoPersonal(): Promise<any> {
    const url = `${environment.backend.aspExtPersonal}getAspiranteExtPersonal/`;
    return this.httpClient.get<any>(url).toPromise();
  }

  public getAllAspExternoAcademic(): Promise<any> {
    const url = `${environment.backend.aspExtAcademic}getAspiranteExtAcademic/`;
    return this.httpClient.get<any>(url).toPromise();
  }

  
  public UpdateAspExtPersonal(aspExtPersonal: any, _id: any): Promise<any> {
    const url = `${environment.backend.aspExtPersonal}${_id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, aspExtPersonal, httpOptions).toPromise();
  } 

  public updateAspExtAcademic(aspExtAcademic: any, _id: any): Promise<any> {
    const url = `${environment.backend.aspExtAcademic}/${_id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, aspExtAcademic, httpOptions).toPromise();
  }

  public updateInscripcion(inscripcion: any, _id: any): Promise<any> {
    const url = `${environment.backend.inscripcion}/${_id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, inscripcion, httpOptions).toPromise();
  }

  public deleteInscripcion( _id: any): Promise<any> {
    const url = `${environment.backend.aspExtAcademic}deleteAspiranteExtAcademicById/${_id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.delete<any>(url).toPromise();
  }

  public getAspirantesExtPersonal(): Promise<any> {
    const url = `${environment.backend.aspExtPersonal}getAspirantesExtPersonal/`;
    return this.httpClient.get<any>(url).toPromise();
  }

  public consultarExternos(consulta) {
    const url = `${environment.backend.aspExtPersonal}consultarExternos/`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, consulta, httpOptions).toPromise();

  }


}
