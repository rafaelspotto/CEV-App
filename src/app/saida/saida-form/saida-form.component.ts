import { Component, OnInit } from '@angular/core';
import { Vegetal } from '../../vegetal/vegetal';
import { VegetalService } from '../../vegetal.service'
import { Saida } from '../saida';
import { SaidaService } from '../../saida.service'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Observable } from 'rxjs';
import { SaidaVegetal } from '../saidaVegetal';
import { SaidaVegetalService } from 'src/app/saidaVegetal.service';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { TipoSaida } from '../tipoSaida';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-saida-form',
  templateUrl: './saida-form.component.html',
  styleUrls: ['./saida-form.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class SaidaFormComponent implements OnInit {

  vegetal: Vegetal;
  vegetalUnido: Vegetal;
  saida: Saida;
  success: boolean = false;
  errors: String[];
  id: number;
  saidaVegetal: SaidaVegetal;
  listaSaidaVegetal: SaidaVegetal[] = [];
  listaVegetal: Vegetal[] = [];
  unirVegetal: Boolean;
  formulario: FormGroup;
  formularioVegetal: FormGroup;
  tipoSaida: TipoSaida;
  listaTipoSaida:TipoSaida[] = [];

  constructor(
    private vegetalService: VegetalService,
    private service: SaidaService,
    private saidaVegetalService: SaidaVegetalService,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.saida = new Saida();
    this.saidaVegetal = new SaidaVegetal();
    this.vegetalUnido = new Vegetal();

  }

  ngOnInit(): void {
    this.montarFormulario();
    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe( urlParams => {
        this.id = urlParams['id'];
        if(this.id){
          this.service
            .getSaidaById(this.id)
            .subscribe(
              response => {
                this.saida = response ;
                if(this.saida.vegetalUnido.id){
                  this.unirVegetal = true;
                  this.vegetalUnido = this.saida.vegetalUnido
                  this.listaSaidaVegetal = this.saida.saidaVegetal
                }
              },errorResponse => {this.saida = new Saida()}
            )
        }
    })
    this.vegetalService
      .getVegetalAtivos()
      .subscribe( resposta => this.listaVegetal = resposta );
    this.service.getTipoSaidas().subscribe (resposta => this.listaTipoSaida = resposta);
  }

  montarFormulario(){
    this.formulario = this.fb.group({
      descricao: ['', Validators.required ],
      dataSaida: ['', Validators.required],
      tipoSaida: ['', Validators.required],
      unirVegetal: [''],
      quantidadeUnido: ['']
    })
    this.formularioVegetal = this.fb.group({
      vegetal: ['', Validators.required ],
      quantidade: ['', [Validators.required,Validators.min(1)]]
    })
  }

  onSubmit(){
    if(this.id){
      if(this.unirVegetal){
        this.vegetalUnido.descricao = "Vegetal Unido " + this.saida.descricao;
        this.vegetalUnido.tipoMariri = "UNIDO";
        this.saida.vegetalUnido = this.vegetalUnido;
      }else {
        this.saida.vegetalUnido = null
      }
      this.saida.totalSaida = this.calculaTotal()
      this.service
        .atualizar(this.saida)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
        }, errorResponse => {
          this.success = false
          this.errors =  errorResponse.error.errors;
          console.log(errorResponse)
        })

    }else{
      if(this.unirVegetal){
        this.vegetalUnido.descricao = "Vegetal Unido " + this.saida.descricao;
        this.vegetalUnido.tipoMariri = "UNIDO";
        this.saida.vegetalUnido = this.vegetalUnido;
      }else {
        this.saida.vegetalUnido = null
      }
      this.saida.totalSaida = this.calculaTotal()
      this.saida.nucleo = this.authService.getUsuarioAutenticado().nucleo
      this.service
      .salvar(this.saida)
      .subscribe( response => {
        this.success = true;
        this.errors = null;
        this.saida = new Saida();
      } , errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })

    }
  }

  adicionar(){
      this.listaSaidaVegetal.push(this.saidaVegetal)
      this.saida.saidaVegetal = this.listaSaidaVegetal
      this.saidaVegetal = new SaidaVegetal();
      this.saida.totalSaida = this.calculaTotal()
  }

  deletar(saidaVegetal: SaidaVegetal){
      this.saida.saidaVegetal.splice(this.saida.saidaVegetal.indexOf(saidaVegetal),1);
      this.listaSaidaVegetal = this.saida.saidaVegetal
      this.saida.totalSaida = this.calculaTotal()
  }

  calculaTotal() {
    return this.saida.saidaVegetal.reduce((total, item) => item.quantidade + total,0)
  }

  compareObj(o1: TipoSaida, o2: TipoSaida) {
    return JSON.stringify(o1) === JSON.stringify(o2);
 }

}
