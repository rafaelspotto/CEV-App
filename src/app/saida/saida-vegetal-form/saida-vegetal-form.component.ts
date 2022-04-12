import { Component, OnInit } from '@angular/core';
import { Vegetal } from '../../vegetal/vegetal';
import { VegetalService } from '../../vegetal.service'
import { Saida } from '../saida';
import { SaidaVegetalService } from '../../saidaVegetal.service'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Observable } from 'rxjs';
import { SaidaVegetal } from '../saidaVegetal';
import { SaidaService } from 'src/app/saida.service';

@Component({
  selector: 'app-saida-vegetal-form',
  templateUrl: './saida-vegetal-form.component.html',
  styleUrls: ['./saida-vegetal-form.component.css']
})
export class SaidaVegetalFormComponent implements OnInit {

  vegetals: Vegetal[];
  saidaVegetal: SaidaVegetal;
  saida: Saida;
  success: boolean = false;
  errors: String[];
  id: number;
  saidaid: number;
  vegetalid:number;

  constructor(    
    private vegetalService: VegetalService,
    private saidaService: SaidaService,
    private service: SaidaVegetalService,
    private router: Router,
    private activatedRoute : ActivatedRoute
  ) { 
    this.saidaVegetal = new SaidaVegetal();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params    
    params.subscribe( urlParams => {
        this.id = urlParams['id'];
        if(this.id){
          this.service
            .getSaidaVegetalById(this.id)
            .subscribe( 
              response => this.saidaVegetal = response ,
              errorResponse => this.saidaVegetal = new SaidaVegetal()
            )
        }
        this.saidaid = urlParams['saidaid'];        
        if(this.saidaid){
          this.saidaService
            .getSaidaById(this.saidaid)
            .subscribe( 
              response => this.saida = response ,
              errorResponse => this.saida = new Saida()
            )
        }
    })
    this.vegetalService
      .getVegetals()
      .subscribe( response => this.vegetals = response );    
  }

  onSubmit(){
    if(this.id){
      this.service
        .atualizar(this.saidaVegetal)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o saida.']
        })

    }else{
      this.saidaVegetal.saida = this.saida;        
      this.service
      .salvar(this.saidaVegetal)
      .subscribe( response => {
        this.success = true;
        this.errors = null;
        this.saidaVegetal = new SaidaVegetal();
      } , errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })

    }    
  }


}
