import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Saida } from './saida/saida';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
import { SaidaGrafico } from './saida/saidaGrafico';
import { Vegetal } from './vegetal/vegetal';
import { TipoSaida } from './saida/tipoSaida';
import { SaidaGraficoConsumo } from './saida/saidaGraficoConsumo';

@Injectable({
  providedIn: 'root'
})
export class SaidaService {

  apiURL: string = environment.apiURLBase + "/api/saida"

  constructor(private http: HttpClient) { }

  salvar(Saida: Saida) : Observable<Saida>{
    return this.http.post<Saida>(this.apiURL, Saida);
  }

  buscar(descricao: string, ano: number, vegetalId: number) : Observable<Saida[]>{

    const httpParams = new HttpParams()
      .set("descricao", descricao)
      .set("ano", ano ?  ano.toString() : '')
      .set("vegetalId", vegetalId ? vegetalId.toString() : '');

    const url = `${this.apiURL}/pesquisar` + "?" + httpParams.toString();
    return this.http.get<any>(url);
  }

  medias( ano: number) : Observable<SaidaGrafico[]>{
    const httpParams = new HttpParams()
      .set("ano", ano);

    const url = `${this.apiURL}/medias` + "?" + httpParams.toString();
    return this.http.get<any>(url);
  }

  mediasConsumo( ano: number) : Observable<SaidaGraficoConsumo[]>{
    const httpParams = new HttpParams()
      .set("ano", ano);

    const url = `${this.apiURL}/mediasConsumo` + "?" + httpParams.toString();
    return this.http.get<any>(url);
  }

  getListaAnos() : Observable<number[]>{
    const url = `${this.apiURL}/listaAnos`;
    return this.http.get<any>(url);
  }

  getSaidas() : Observable<Saida[]> {
    return this.http.get<any>(`${this.apiURL}`);
  }

  getTipoSaidas() : Observable<TipoSaida[]> {
    return this.http.get<any>(`${this.apiURL}/tipoSaida`);
  }

  getSaidaById(id: number) : Observable<Saida> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar(Saida: Saida) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${Saida.id}`);
  }

  atualizar( Saida: Saida ) : Observable<any> {
    return this.http.put<Saida>(`${this.apiURL}/${Saida.id}` , Saida);
  }

}
