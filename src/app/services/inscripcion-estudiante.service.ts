import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscripcionEstudianteService {

  public url: String;
 
  constructor( private httpClient: HttpClient) { 
  }

  public saveAspUisPersonal(aspUisPersonal: any): Promise<any> {
    const url = `${environment.backend.aspUisPersonal}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, aspUisPersonal, httpOptions).toPromise();
  }


  public UpdateAspUisPersonal(aspUisPersonal: any, _id: any): Promise<any> {
    const url = `${environment.backend.aspUisPersonal}${_id}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${environment.TOKEN}`, //Se agrega en todo lo que necesite autorización
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, aspUisPersonal, httpOptions).toPromise();
  } 

  public getAspUisPersonal(_id: any): Promise<any> {
    const url = `${environment.backend.aspUisPersonal}getAspUisPersonalById/${_id}`;
    return this.httpClient.get<any>(url).toPromise();
  }

  public getAllAspUisPersonal(): Promise<any> {
    const url = `${environment.backend.aspUisPersonal}getAspiranteUisPersonal/`;
    return this.httpClient.get<any>(url).toPromise();
  }


  public saveAspUisAcademic(aspUisAcademic: any): Promise<any> {
    const url = `${environment.backend.aspUisAcademic}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, aspUisAcademic, httpOptions).toPromise();
  }
  
  public updateAspUisAcademic(aspUisAcademic: any, _id: any): Promise<any> {
    const url = `${environment.backend.aspUisAcademic}/${_id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${environment.TOKEN}`, //Se agrega en todo lo que necesite autorización
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, aspUisAcademic, httpOptions).toPromise();
  }

  public getAspUisAcademic(_id: any): Promise<any> {
   // const url = `${environment.backend.aspUisAcademic}getAspUisAcademicById/${_id}`;
    const url = `${environment.backend.aspUisAcademic}getAspUisAcademicById/:_id`;
    return this.httpClient.get<any>(url).toPromise();
  }

  public getAllAspUisAcademic(): Promise<any> {
    const url = `${environment.backend.aspUisAcademic}getAspiranteUisAcademic/`;
    return this.httpClient.get<any>(url).toPromise();
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


  public updateInscripcion(inscripcion: any, _id: any): Promise<any> {
    const url = `${environment.backend.inscripcion}/${_id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${environment.TOKEN}`, //Se agrega en todo lo que necesite autorización
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, inscripcion, httpOptions).toPromise();
  }


  public deleteInscripcion( _id: any): Promise<any> {
    const url = `${environment.backend.aspUisAcademic}deleteAspiranteUisAcademic/${_id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.delete<any>(url).toPromise();
  }

  public getAspirantesUisPersonal(): Promise<any> {
    const url = `${environment.backend.aspUisPersonal}getAspirantesUisPersonal/`;
    return this.httpClient.get<any>(url).toPromise();
  }

  public consultarEstudiantes(consulta) {
    const url = `${environment.backend.aspUisPersonal}consultarEstudiantes/`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, consulta, httpOptions).toPromise();

  }

  

}
