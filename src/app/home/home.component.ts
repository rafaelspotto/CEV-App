import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label,Color } from 'ng2-charts'
import { SaidaService } from '../saida.service'
import { Saida } from '../saida/saida';
import { SaidaGrafico } from '../saida/saidaGrafico';
import { SaidaGraficoConsumo } from '../saida/saidaGraficoConsumo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  saidas: SaidaGrafico[];
  saidasConsumo: SaidaGraficoConsumo[];
  doughnutChartLabels: Label[];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType = 'doughnut';
  listaAnos: number[];
  ano: number = new Date().getFullYear();

  public doughnutChartColors: Color[] = [
    { backgroundColor: [
      'orange',
      'green',
      'blue',
      'pink'
    ] }
 ]

public barChartOptions: ChartOptions = {
  responsive: true,
};

public barChartLabels: Label[];
public barChartType: ChartType = 'bar';
public barChartLegend = true;
public barChartPlugins = [];
public barChartData: ChartDataSets[];
chartReady = false;

  constructor(
    private service: SaidaService
  ) { }

  ngOnInit(): void {
    this.service
            .getListaAnos()
            .subscribe( resposta => {
              this.listaAnos = resposta
            })
    this.service
            .medias(this.ano)
            .subscribe( resposta => {
              this.saidas = resposta
              this.doughnutChartLabels = this.saidas.map(function(e) { return e.nome; } );
              this.doughnutChartData = [this.saidas.map(function(e) { return e.media; } )]
            });
    this.service
            .mediasConsumo(this.ano)
            .subscribe( resposta => {
              this.saidasConsumo = resposta
              this.barChartLabels = this.saidasConsumo.map(function(e) { return e.mes; } );
              this.barChartData = [{data: this.saidasConsumo .map(function(e) { return e.media; }), label: 'Média por pessoa em ML'},
              {data: this.saidasConsumo .map(function(e) { return e.mediaSessao; }), label: 'Média por Sessão em L'}]
              this.chartReady = true;
            });
  }

  reload(){
    this.ngOnInit()
  }

}
