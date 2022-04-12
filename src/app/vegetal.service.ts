import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

import { Vegetal } from './vegetal/vegetal';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
import { SaidaVegetal } from './saida/saidaVegetal';
import { TipoMariri } from './vegetal/tipoMariri';

@Injectable({
  providedIn: 'root'
})
export class VegetalService {

  apiURL: string = environment.apiURLBase + '/api/vegetal';

  constructor( private http: HttpClient ) {}

  salvar( vegetal: Vegetal ) : Observable<Vegetal> {
    return this.http.post<Vegetal>( `${this.apiURL}` , vegetal);
  }

  atualizar( vegetal: Vegetal ) : Observable<any> {
    return this.http.put<Vegetal>(`${this.apiURL}/${vegetal.id}` , vegetal);
  }

  getVegetals() : Observable<Vegetal[]> {
    return this.http.get<Vegetal[]>(this.apiURL);
  }

  getVegetalAtivos() : Observable<Vegetal[]> {
    return this.http.get<Vegetal[]>(`${this.apiURL}/ativos`);
  }

  getTotalEstoque() : Observable<Number> {
    return this.http.get<any>(`${this.apiURL}/totalEstoque`);
  }

  getVegetalById(id: number) : Observable<Vegetal> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  getTipoMariri() : Observable<TipoMariri[]> {
    return this.http.get<any>(`${this.apiURL}/tipoMariri`);
  }

  deletar(vegetal: Vegetal) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${vegetal.id}`);
  }

  ativar(vegetal: Vegetal) : Observable<any> {
    return this.http.patch( `${this.apiURL}/${vegetal.id}/ativar`, null );
  }

  getHistoricoVegetal(id: number ) : Observable<any> {
    return this.http.get<SaidaVegetal[]>(`${this.apiURL}/${id}/historico`);
  }

  buscar(descricao: string, ano: number) : Observable<Vegetal[]>{

    const httpParams = new HttpParams()
      .set("descricao", descricao)
      .set("ano", ano ?  ano.toString() : '');

    const url = `${this.apiURL}/pesquisar` + "?" + httpParams.toString();
    return this.http.get<any>(url);
  }

}
