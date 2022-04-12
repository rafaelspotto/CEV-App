import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';

import { SaidaRoutingModule } from './saida-routing.module';
import { SaidaFormComponent } from './saida-form/saida-form.component';
import { SaidaListaComponent } from './saida-lista/saida-lista.component';
import { RouterModule } from '@angular/router';
import { SaidaVegetalFormComponent } from './saida-vegetal-form/saida-vegetal-form.component';

import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [
    SaidaFormComponent,
    SaidaListaComponent, SaidaVegetalFormComponent
  ],
  imports: [
    CommonModule,
    SaidaRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MomentDateModule,
    MatInputModule,
    NgxMaskModule.forRoot()
  ], exports : [
    SaidaFormComponent,
    SaidaListaComponent
  ]
})
export class SaidaModule { }
