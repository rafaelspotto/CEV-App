import { Component, OnInit } from '@angular/core';
import { Entrada } from '../entrada';
import { EntradaService } from '../../entrada.service'

@Component({
  selector: 'app-entrada-lista',
  templateUrl: './entrada-lista.component.html',
  styleUrls: ['./entrada-lista.component.css']
})
export class EntradaListaComponent implements OnInit {

  descricao: string='';
  ano: number;
  entradas: Entrada[];
  entradaSelecionado: Entrada;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private service: EntradaService
  ) {

  }

  ngOnInit(): void {
    this.service
            .getEntradas()
            .subscribe( resposta => this.entradas = resposta );
  }

  consultar(){
    this.service
      .buscar(this.descricao,this.ano)
      .subscribe(response => {
        console.log(response);
        this.entradas = response;
        if( this.entradas.length <= 0 ){
          this.mensagemErro = "Nenhum Registro encontrado.";
        }else{
          this.mensagemErro = null;
        }
      });
  }

  preparaDelecao(entrada: Entrada){
    this.entradaSelecionado = entrada;
  }

  deletarEntrada(){
    this.service
      .deletar(this.entradaSelecionado)
      .subscribe(
        response => {
          this.mensagemSucesso = 'Entrada deletada com sucesso!'
          this.mensagemErro = null
          this.ngOnInit();
        },
        err => {
          this.mensagemErro = 'Ocorreu um erro ao deletar a Entrada. '
          this.mensagemSucesso = null
        }
      )
  }

}
