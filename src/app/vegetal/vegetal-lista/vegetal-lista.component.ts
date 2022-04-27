import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { Vegetal } from '../vegetal';
import { VegetalService } from '../../vegetal.service'

@Component({
  selector: 'app-vegetal-lista',
  templateUrl: './vegetal-lista.component.html',
  styleUrls: ['./vegetal-lista.component.css']
})
export class VegetalListaComponent implements OnInit {

  listaVegetal: Vegetal[] = [];
  listaVegetalAtivos: Vegetal[] = [];
  listaVegetalInativos: Vegetal[] = [];
  vegetalSelecionado: Vegetal;
  mensagemSucesso: string;
  mensagemErro: string;
  totalEstoque: number;
  descricao: string='';
  ano: number;
  message: string;

  constructor(
    private service: VegetalService,
    private router: Router) {}

  ngOnInit(): void {
    this.service
      .getVegetals()
      .subscribe( resposta => {
          this.listaVegetal = resposta,
          this.listaVegetalAtivos = this.listaVegetal.filter(vegetal => vegetal.ativo == true);
          this.listaVegetalInativos = this.listaVegetal.filter(vegetal => vegetal.ativo == false);
          this.totalEstoque = this.calculaTotal();
        });

      /* this.service
      .getTotalEstoque()
      .subscribe( resposta => this.totalEstoque = resposta ); */
  }

  novoCadastro(){
    this.router.navigate(['/vegetal/form'])
  }

  preparaDelecao(vegetal: Vegetal){
    this.vegetalSelecionado = vegetal;
  }

  ativar(vegetal: Vegetal){
    if (vegetal.ativo){
      this.listaVegetalAtivos.splice(this.listaVegetalAtivos.indexOf(vegetal),1)
      this.listaVegetalInativos.push(vegetal)
    }else {
      this.listaVegetalInativos.splice(this.listaVegetalInativos.indexOf(vegetal),1)
      this.listaVegetalAtivos.push(vegetal)
    }
    this.service.ativar(vegetal).subscribe(response => {
      vegetal.ativo = !vegetal.ativo;
    })
    this.totalEstoque = this.calculaTotal();
  }

  consultar(){
    this.service
      .buscar(this.descricao,this.ano)
      .subscribe(response => {
        this.listaVegetal = response;
        if( this.listaVegetal.length <= 0 ){
          this.message = "Nenhum Registro encontrado.";
        }else{
          this.listaVegetalAtivos = this.listaVegetal.filter(vegetal => vegetal.ativo == true);
          this.listaVegetalInativos = this.listaVegetal.filter(vegetal => vegetal.ativo == false);
          this.message = null;
          this.totalEstoque = this.calculaTotal();
        }
      });
  }

  calculaTotal() {
    return this.listaVegetalAtivos.reduce((total, item) => Number(item.quantidade) + total,0)
  }
}
