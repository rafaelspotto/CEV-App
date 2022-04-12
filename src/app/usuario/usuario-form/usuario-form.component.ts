import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Usuario } from '../usuario'
import { UsuarioService } from '../../usuario.service'
import { Observable } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ERole } from '../ERole';
import { AuthService } from 'src/app/auth.service';
import { Nucleo } from 'src/app/nucleo/nucleo';
import { NucleoService } from 'src/app/nucleo.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  usuario: Usuario;
  success: boolean = false;
  errors: String[];
  id: number;
  form: FormGroup;
  isMasterSel:boolean= false;
  checkedCategoryList:any[];
  listaNucleo: Nucleo[] = [];
  nucleo: Nucleo;

  roles = [
    { name: 'ROLE_USER', id: 1, isSelected: false },
    { name: 'ROLE_ADMIN', id: 2, isSelected: false }
  ]

  constructor(
      private service: UsuarioService ,
      private authService: AuthService,
      private router: Router,
      private activatedRoute : ActivatedRoute,
      private formBuilder: FormBuilder,
      private nucleoService: NucleoService,
      ) {
    this.usuario = new Usuario();

    this.form = this.formBuilder.group({
      username:[''],
      password:[''],
      email:[''],
      roles:[''],
      nucleo:['']
    });

  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe( urlParams => {
        this.id = urlParams['id'];
        if(this.id){
          this.service
            .getUsuarioById(this.id)
            .subscribe(response => {
                this.usuario = response ,
                this.setCheckedItemList()
              }, errorResponse => this.usuario = new Usuario()
            )
        }
    })
    this.nucleoService
      .getNucleos()
      .subscribe( resposta => this.listaNucleo = resposta );
  }

  voltarParaListagem(){
    this.router.navigate(['/usuario/lista'])
  }

  onSubmit(){
    this.getCheckedItemList()
    this.usuario.roles = this.checkedCategoryList
    //this.usuario.nucleo = this.authService.getUsuarioAutenticado().nucleo
    if(this.id){
      this.service
        .atualizar(this.usuario)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
        }, errorResponse => {
          this.errors = errorResponse.error.errors
        })
    }else{
      this.authService
        .salvar(this.usuario)
          .subscribe( response => {
            this.success = true;
            this.errors = null;
            this.usuario = response;
          } , errorResponse => {
            this.success = false;
            this.errors = errorResponse.error.errors;
          })
    }
  }

  getCheckedItemList(){
    this.checkedCategoryList = [];
    for (var i = 0; i < this.roles.length; i++) {
      if(this.roles[i].isSelected)
      this.checkedCategoryList.push(this.roles[i]);
    }
  }

  setCheckedItemList(){
    const roles = JSON.stringify(this.usuario.roles)
      for (var y = 0; y < this.roles.length; y++) {
        if(roles.includes(this.roles[y].name)){
          this.roles[y].isSelected = true
        }
      }
  }

  compareObj(o1: Nucleo, o2: Nucleo) {
    return JSON.stringify(o1) === JSON.stringify(o2);
 }

}
