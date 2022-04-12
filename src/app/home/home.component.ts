import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label,Color } from 'ng2-charts'
import { SaidaService } from '../saida.service'
import { Saida } from '../saida/saida';
import { SaidaGrafico } from '../saida/saidaGrafico';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  saidas: SaidaGrafico[];
  doughnutChartLabels: Label[];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType = 'doughnut';

  public doughnutChartColors: Color[] = [
    { backgroundColor: [
      'orange',
      'green',
      'blue',
      'pink'
    ] }
 ]

  constructor(
    private service: SaidaService
  ) { }

  ngOnInit(): void {
    this.service
            .medias(2022)
            .subscribe( resposta => {
              this.saidas = resposta
              this.doughnutChartLabels = this.saidas.map(function(e) { return e.nome; } );
              this.doughnutChartData = [this.saidas.map(function(e) { return e.media; } )]
            });
  }



}
