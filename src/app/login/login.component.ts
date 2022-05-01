import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../usuario/usuario'
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog-component/progress-spinner-dialog-component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  username: string;
  password: string;
  cadastrando: boolean;
  mensagemSucesso: string;
  errors: String[];
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private dialog: MatDialog
  ) { }

  onSubmit(){
    let dialogRef: MatDialogRef<ProgressSpinnerDialogComponent> = this.dialog.open(ProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.authService
          .login(this.username, this.password)
          .subscribe(data => {
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
            dialogRef.close();
            this.router.navigate(['/home']);
          }, errorResponse => {
            this.errors = errorResponse.error.errors;
            this.isLoginFailed = true;
            dialogRef.close();
          })

  }

  preparaCadastrar(event){
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro(){
    this.cadastrando = false;
  }

  cadastrar(){
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService
        .salvar(usuario)
        .subscribe( response => {
            this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o login.";
            this.cadastrando = false;
            this.username = '';
            this.password = '';
            this.errors = []
        }, errorResponse => {
            this.mensagemSucesso = null;
            this.errors = errorResponse.error.errors;
        })
  }

}
