import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatTabsModule } from '@angular/material/tabs'
import { MatIconModule  } from '@angular/material/icon'

import { VegetalRoutingModule } from './vegetal-routing.module';
import { VegetalFormComponent } from './vegetal-form/vegetal-form.component';
import { VegetalListaComponent } from './vegetal-lista/vegetal-lista.component';

import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    VegetalFormComponent,
    VegetalListaComponent
  ],
  imports: [
    CommonModule,
    VegetalRoutingModule,
    FormsModule,
    MatTabsModule,
    MatIconModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ], exports: [
    VegetalFormComponent,
    VegetalListaComponent
  ]
})
export class VegetalModule { }
