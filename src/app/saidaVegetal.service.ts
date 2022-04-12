import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SaidaVegetal } from './saida/saidaVegetal';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class SaidaVegetalService {

  apiURL: string = environment.apiURLBase + "/api/saidavegetal"

  constructor(private http: HttpClient) { }

  salvar(saidaVegetal: SaidaVegetal) : Observable<SaidaVegetal>{
    return this.http.post<SaidaVegetal>(this.apiURL, saidaVegetal);
  }

  getSaidasVegetal() : Observable<SaidaVegetal[]> {
    return this.http.get<any>(`${this.apiURL}`);
  }

  getSaidaVegetalById(id: number) : Observable<SaidaVegetal> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar(saidaVegetal: SaidaVegetal) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${saidaVegetal.id}`);
  }

  atualizar( saidaVegetal: SaidaVegetal ) : Observable<any> {
    return this.http.put<SaidaVegetal>(`${this.apiURL}/${saidaVegetal.id}` , saidaVegetal);
  }

}
