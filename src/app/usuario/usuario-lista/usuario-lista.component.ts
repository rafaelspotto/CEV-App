import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { Usuario } from '../usuario';
import { UsuarioService } from '../../usuario.service'

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent implements OnInit {

  listaUsuario: Usuario[] = [];
  usuarioSelecionado: Usuario;
  mensagemSucesso: string;
  mensagemErro: string;
  descricao: string='';
  message: string;

  constructor(
    private service: UsuarioService,
    private router: Router) {}

  ngOnInit(): void {
    this.service
      .getUsuarios()
      .subscribe( resposta => this.listaUsuario = resposta );
  }

  novoCadastro(){
    this.router.navigate(['/usuario/form'])
  }

  preparaDelecao(usuario: Usuario){
    this.usuarioSelecionado = usuario;
  }

  deletarUsuario(){
    this.service
      .deletar(this.usuarioSelecionado)
      .subscribe(
        response => {
          this.mensagemSucesso = 'Usuario deletado com sucesso!'
          this.ngOnInit();
        },
        erro => this.mensagemErro = 'Ocorreu um erro ao deletar o cliente.'
      )
  }

  ativar(usuario: Usuario){
    this.service.ativar(usuario).subscribe(response => {
      usuario.ativo = !usuario.ativo;
    })
  }

  consultar(){
    this.service
      .buscar(this.descricao)
      .subscribe(response => {
        console.log(response);
        this.listaUsuario = response;
        if( this.listaUsuario.length <= 0 ){
          this.message = "Nenhum Registro encontrado.";
        }else{
          this.message = null;
        }
      });
  }
}
