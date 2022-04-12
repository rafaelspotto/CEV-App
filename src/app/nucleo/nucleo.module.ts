import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { NucleoFormComponent } from './nucleo-form/nucleo-form.component';
import { NucleoRoutingModule } from './nucleo-routing.module';



@NgModule({
  declarations: [
    NucleoFormComponent
  ],
  imports: [
    CommonModule,
    NucleoRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class NucleoModule { }
