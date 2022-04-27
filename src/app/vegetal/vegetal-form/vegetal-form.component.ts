import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Vegetal } from '../vegetal'
import { VegetalService } from '../../vegetal.service'
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { SaidaVegetal } from 'src/app/saida/saidaVegetal';
import { TipoMariri } from '../tipoMariri';

@Component({
  selector: 'app-vegetal-form',
  templateUrl: './vegetal-form.component.html',
  styleUrls: ['./vegetal-form.component.css']
})
export class VegetalFormComponent implements OnInit {

  vegetal: Vegetal;
  success: boolean = false;
  errors: String[];
  id: number;
  formularioVegetal: FormGroup;
  listaSaidaVegetal: SaidaVegetal[] = [];
  total:number;
  tipoMariri: TipoMariri;
  listaTipoMariri: TipoMariri[] = [];

  constructor(
      private service: VegetalService ,
      private router: Router,
      private activatedRoute : ActivatedRoute,
      private fb: FormBuilder,
      private authService: AuthService
      ) {
    this.vegetal = new Vegetal();
  }

  ngOnInit(): void {
    this.montarFormulario();
    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe( urlParams => {
        this.id = urlParams['id'];
        if(this.id){
          this.service
            .getVegetalById(this.id)
            .subscribe(
              response => this.vegetal = response ,
              errorResponse => this.vegetal = new Vegetal()
          )
          this.service
            .getHistoricoVegetal(this.id)
            .subscribe(
              response => {
                this.listaSaidaVegetal = response
                this.total = this.calculaTotal();
              }
            )
        }
    })
    this.service.getTipoMariri().subscribe (resposta => this.listaTipoMariri = resposta);
  }

  montarFormulario(){
    this.formularioVegetal = this.fb.group({
      descricao: ['', Validators.required ],
      quantidade: ['', [Validators.required,Validators.min(1)]],
      tipoMariri: ['', Validators.required],
      numero: [''],
      ano: ['']
    })
  }

  voltarParaListagem(){
    this.router.navigate(['/vegetal/lista'])
  }

  onSubmit(){
    if(this.id){
      this.service
        .atualizar(this.vegetal)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
        })
    }else{
      this.vegetal.nucleo = this.authService.getUsuarioAutenticado().nucleo
      this.service
        .salvar(this.vegetal)
          .subscribe( response => {
            this.success = true;
            this.errors = null;
            this.vegetal = response;
          } , errorResponse => {
            this.success = false;
            this.errors = errorResponse.error.errors;
          })
    }
  }

  calculaTotal() {
    return this.listaSaidaVegetal.reduce((total, item) => Number(item.quantidade) + total,0)
  }

  compareObj(o1: TipoMariri, o2: TipoMariri) {
    return JSON.stringify(o1) === JSON.stringify(o2) ;
 }

}
