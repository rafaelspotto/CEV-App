import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario/usuario';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
import { JwtHelperService } from '@auth0/angular-jwt'
import { TokenStorageService } from './token-storage.service';
import { ERole } from './usuario/ERole';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURLBase + '/api/auth/'
  signin: string = this.apiURL + 'signin'
  signup: string = this.apiURL + 'signup'
  jwtHelper: JwtHelperService = new JwtHelperService();
  private roles: string[] = [];
  usuario: Usuario;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  obterToken(){
    const tokenString = localStorage.getItem('access_token')
    if(tokenString){
      const token = JSON.parse(tokenString).access_token
      return token;
    }
    return null;
  }

  encerrarSessao(){
      this.tokenStorage.signOut();
  }

  getUsuarioAutenticado(){
    if (this.isAuthenticated()) {
      this.usuario = this.tokenStorage.getUser();
      this.roles = this.usuario.roles;
      return this.usuario;
    }
  }

  isAuthenticated() : boolean {
    if (this.tokenStorage.getToken()) {
      return  true;
    }else{
      return false;
    }
  }

  salvar(usuario: Usuario) : Observable<any> {
    return this.http.post<any>(this.signup, usuario);
  }

  login( username: string, password: string ) : Observable<any> {
    return this.http.post(this.signin, {
      username,
      password
    }, httpOptions);
  }
}
