import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  public url: String;

  constructor (private httpClient: HttpClient) {  }



  public getPais(): Promise < any > {
  const url = `${environment.backend.pais}getPais/`;
  return this.httpClient.get<any>(url).toPromise();
}

}

