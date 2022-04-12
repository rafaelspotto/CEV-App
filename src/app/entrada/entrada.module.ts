import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';

import { EntradaRoutingModule } from './entrada-routing.module';
import { EntradaFormComponent } from './entrada-form/entrada-form.component';
import { EntradaListaComponent } from './entrada-lista/entrada-lista.component';
import { RouterModule } from '@angular/router';

import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    EntradaFormComponent,
    EntradaListaComponent
  ],
  imports: [
    CommonModule,
    EntradaRoutingModule,
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
    EntradaFormComponent,
    EntradaListaComponent
  ]
})
export class EntradaModule { }
