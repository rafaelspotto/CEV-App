import { Component, OnInit } from '@angular/core';
import { Saida } from '../saida';
import { SaidaService } from '../../saida.service'
import { Vegetal } from 'src/app/vegetal/vegetal';
import { VegetalService } from 'src/app/vegetal.service';

@Component({
  selector: 'app-saida-lista',
  templateUrl: './saida-lista.component.html',
  styleUrls: ['./saida-lista.component.css']
})
export class SaidaListaComponent implements OnInit {

  descricao: string='';
  ano: number;
  saidas: Saida[];
  message: string;
  saidaSelecionado: Saida;
  mensagemSucesso: string;
  mensagemErro: string;
  listaVegetal: Vegetal[] = [];
  vegetal: Vegetal;

  constructor(
    private service: SaidaService,
    private vegetalService: VegetalService
  ) {
    this.vegetal = new Vegetal();
  }

  ngOnInit(): void {
    this.service
      .getSaidas()
      .subscribe( resposta => this.saidas = resposta );
    this.vegetalService
      .getVegetals()
      .subscribe( resposta => this.listaVegetal = resposta );

  }

  consultar(){
    this.service
      .buscar(this.descricao,this.ano,this.vegetal.id)
      .subscribe(response => {
        this.saidas = response;
        if( this.saidas.length <= 0 ){
          this.message = "Nenhum Registro encontrado.";
        }else{
          this.message = null;
        }
      });
  }

  preparaDelecao(saida: Saida){
    this.saidaSelecionado = saida;
  }

  deletarSaida(){
    this.service
      .deletar(this.saidaSelecionado)
      .subscribe(
        response => {
          this.mensagemSucesso = 'Saida deletada com sucesso!'
          this.mensagemErro = null
          this.ngOnInit();
        },
        erro => {
          this.mensagemErro = 'Ocorreu um erro ao deletar a saída.'
          this.mensagemSucesso = null
        }
      )
  }

}
