import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NucleoService } from 'src/app/nucleo.service';
import { Nucleo } from '../nucleo';

@Component({
  selector: 'app-nucleo-form',
  templateUrl: './nucleo-form.component.html',
  styleUrls: ['./nucleo-form.component.css']
})

export class NucleoFormComponent implements OnInit {

  listaNucleo: Nucleo[] = [];
  nucleoSelecionado: Nucleo;
  mensagemSucesso: string;
  mensagemErro: string;
  descricao: string='';
  message: string;
  nucleo: Nucleo;
  success: boolean = false;
  errors: String[];
  id: number;
  formulario: FormGroup;

  constructor(
    private service: NucleoService,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private fb: FormBuilder)
    {
      this.nucleo = new Nucleo();
    }

  ngOnInit(): void {
    this.montarFormulario();
    this.service
      .getNucleos()
      .subscribe( resposta => {
        this.listaNucleo = resposta
        console.log(resposta)} );

    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe( urlParams => {
        this.id = urlParams['id'];
        if(this.id){
          this.service
            .getNucleoById(this.id)
            .subscribe(
              response => this.nucleo = response ,
              errorResponse => this.nucleo = new Nucleo()
            )
        }
    })
  }

  montarFormulario(){
    this.formulario = this.fb.group({
      nome: ['', Validators.required ]
    })
  }

  onSubmit(){
    if(this.id){
      console.log(this.nucleo)
      this.service
        .atualizar(this.nucleo)
        .subscribe(response => {
            this.mensagemSucesso = "Núcleo atualizado com sucesso.";
            this.mensagemErro = null;
            this.ngOnInit();
        }, errorResponse => {
          this.mensagemErro = errorResponse.error.errors
          this.mensagemSucesso = null;
        })
    }else{
      this.service
        .salvar(this.nucleo)
          .subscribe( response => {
            this.mensagemSucesso = "Núcleo salvo com sucesso.";;
            this.mensagemErro = null;
            this.nucleo = response;
            this.ngOnInit();
          } , errorResponse => {
            this.mensagemSucesso = null;
            this.mensagemErro = errorResponse.error.errors;
          })
    }
  }

  preparaDelecao(nucleo: Nucleo){
    this.nucleoSelecionado = nucleo;
  }

  deletarNucleo(){
    this.service
      .deletar(this.nucleoSelecionado)
      .subscribe(
        response => {
          this.mensagemSucesso = 'Nucleo deletado com sucesso!'
          this.mensagemErro = null;
          this.ngOnInit();
        },
        erro => {
          this.mensagemErro = 'Ocorreu um erro ao deletar o cliente.'
          this.mensagemSucesso = null;
        }
      )
  }

  voltarParaListagem(){
    this.router.navigate(['/nucleo/lista'])
  }

}
