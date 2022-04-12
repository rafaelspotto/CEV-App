import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatTabsModule } from '@angular/material/tabs'
import { MatIconModule  } from '@angular/material/icon'

import { VegetalRoutingModule } from './vegetal-routing.module';
import { VegetalFormComponent } from './vegetal-form/vegetal-form.component';
import { VegetalListaComponent } from './vegetal-lista/vegetal-lista.component';

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
    ReactiveFormsModule
  ], exports: [
    VegetalFormComponent,
    VegetalListaComponent
  ]
})
export class VegetalModule { }
