import { Component, OnInit } from '@angular/core';
import { Entrada } from '../entrada';
import { EntradaService } from '../../entrada.service'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Observable } from 'rxjs';
import { Vegetal } from '../../vegetal/vegetal';
import { VegetalService } from 'src/app/vegetal.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { TipoEntrada } from '../tipoEntrada';
import { TipoMariri } from 'src/app/vegetal/tipoMariri';

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
  selector: 'app-entrada-form',
  templateUrl: './entrada-form.component.html',
  styleUrls: ['./entrada-form.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})

export class EntradaFormComponent implements OnInit {

  formulario: FormGroup;
  formularioVegetal: FormGroup;
  entrada: Entrada;
  vegetal: Vegetal;
  success: boolean = false;
  errors: String[];
  id: number;
  listaVegetal: Vegetal[] = [];
  tipoEntrada: TipoEntrada;
  listaTipoEntrada: TipoEntrada[] = [];
  tipoMariri: TipoMariri;
  listaTipoMariri: TipoMariri[] = [];

  constructor(
    private service: EntradaService,
    private vegetalService: VegetalService,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.entrada = new Entrada();
    this.vegetal = new Vegetal();
  }

  ngOnInit(): void {
    this.montarFormulario();
    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe( urlParams => {
        this.id = urlParams['id'];
        if(this.id){
          this.service
            .getEntradaById(this.id)
            .subscribe(
              response => this.entrada = response ,
              errorResponse => this.entrada = new Entrada()
            )
        }
    })
    this.service.getTipoEntradas().subscribe (resposta => this.listaTipoEntrada = resposta);
    this.vegetalService.getTipoMariri().subscribe (resposta => this.listaTipoMariri = resposta);
  }

  montarFormulario(){
    this.formulario = this.fb.group({
      descricao: ['', Validators.required ],
      dataEntrada: ['', Validators.required],
      tipoEntrada: ['', Validators.required]
    })
    this.formularioVegetal = this.fb.group({
      descricao: ['', Validators.required ],
      quantidade: ['', [Validators.required,Validators.min(1)]],
      tipoMariri: ['', Validators.required],
      numero: [''],
      ano: ['']
    })
  }

  onSubmit(){
    if(this.id){
      this.service
        .atualizar(this.entrada)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
        }, errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
        })

    }else{
      this.entrada.nucleo = this.authService.getUsuarioAutenticado().nucleo
      this.service
      .salvar(this.entrada)
      .subscribe( response => {
        this.success = true;
        this.errors = null;
        this.entrada = new Entrada();
        this.listaVegetal = [];
      } , errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })

    }
  }

  adicionar(){
    this.listaVegetal.push(this.vegetal)
    this.entrada.listaVegetal = this.listaVegetal
    this.vegetal = new Vegetal();
  }

  deletar(vegetal: Vegetal){
    this.entrada.listaVegetal.splice(this.entrada.listaVegetal.indexOf(vegetal),1);
    this.listaVegetal = this.entrada.listaVegetal
  }

  compareObj(o1: TipoEntrada, o2: TipoEntrada) {
    return JSON.stringify(o1) === JSON.stringify(o2);
 }

}
