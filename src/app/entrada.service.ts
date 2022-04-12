import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Entrada } from './entrada/entrada';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
import { EntradaBusca } from './entrada/entrada-lista/entradaBusca';
import { TipoEntrada } from './entrada/tipoEntrada';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  apiURL: string = environment.apiURLBase + "/api/entrada"

  constructor(private http: HttpClient) { }

  salvar(Entrada: Entrada) : Observable<Entrada>{
    return this.http.post<Entrada>(this.apiURL, Entrada);
  }

  buscar(descricao: string, ano: number) : Observable<Entrada[]>{

    const httpParams = new HttpParams()
      .set("descricao", descricao)
      .set("ano", ano ?  ano.toString() : '');

    const url = `${this.apiURL}/pesquisar` + "?" + httpParams.toString();
    return this.http.get<any>(url);
  }

  getEntradas() : Observable<Entrada[]> {
    return this.http.get<any>(`${this.apiURL}`);
  }

  getEntradaById(id: number) : Observable<Entrada> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  getTipoEntradas() : Observable<TipoEntrada[]> {
    return this.http.get<any>(`${this.apiURL}/tipoEntrada`);
  }

  deletar(Entrada: Entrada) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${Entrada.id}`);
  }

  atualizar( Entrada: Entrada ) : Observable<any> {
    return this.http.put<Entrada>(`${this.apiURL}/${Entrada.id}` , Entrada);
  }

}
