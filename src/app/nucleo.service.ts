import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

import { Nucleo } from './nucleo/nucleo';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class NucleoService {

  apiURL: string = environment.apiURLBase + '/api/nucleo';

  constructor( private http: HttpClient ) {}

  salvar( nucleo: Nucleo ) : Observable<Nucleo> {
    return this.http.post<Nucleo>( `${this.apiURL}` , nucleo);
  }

  atualizar( nucleo: Nucleo ) : Observable<any> {
    return this.http.put<Nucleo>(`${this.apiURL}/${nucleo.id}` , nucleo);
  }

  getNucleos() : Observable<Nucleo[]> {
    return this.http.get<Nucleo[]>(this.apiURL);
  }

  getNucleoById(id: number) : Observable<Nucleo> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar(nucleo: Nucleo) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${nucleo.id}`);
  }

  ativar(nucleo: Nucleo) : Observable<any> {
    return this.http.patch( `${this.apiURL}/${nucleo.id}/ativar`, null );
  }

  buscar(descricao: string) : Observable<Nucleo[]>{

    const httpParams = new HttpParams()
      .set("descricao", descricao)

    const url = `${this.apiURL}/pesquisar` + "?" + httpParams.toString();
    return this.http.get<any>(url);
  }

}
