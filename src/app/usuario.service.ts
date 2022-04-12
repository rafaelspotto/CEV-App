import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

import { Usuario } from './usuario/usuario';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiURL: string = environment.apiURLBase + '/api/usuario';

  constructor( private http: HttpClient ) {}

  salvar( usuario: Usuario ) : Observable<Usuario> {
    return this.http.post<Usuario>( `${this.apiURL}` , usuario);
  }

  atualizar( usuario: Usuario ) : Observable<any> {
    return this.http.put<Usuario>(`${this.apiURL}/${usuario.id}` , usuario);
  }

  getUsuarios() : Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiURL);
  }

  getUsuarioById(id: number) : Observable<Usuario> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar(usuario: Usuario) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${usuario.id}`);
  }

  ativar(usuario: Usuario) : Observable<any> {
    return this.http.patch( `${this.apiURL}/${usuario.id}/ativar`, null );
  }

  buscar(descricao: string) : Observable<Usuario[]>{

    const httpParams = new HttpParams()
      .set("descricao", descricao)

    const url = `${this.apiURL}/pesquisar` + "?" + httpParams.toString();
    return this.http.get<any>(url);
  }

}
