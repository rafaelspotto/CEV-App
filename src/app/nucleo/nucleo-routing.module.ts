import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth.guard'
import { NucleoFormComponent } from './nucleo-form/nucleo-form.component';


const routes: Routes = [
  { path : 'nucleo' , component: LayoutComponent,
    canActivate: [AuthGuard] ,children: [
    { path: 'lista' , component: NucleoFormComponent },
    { path: 'lista/:id' , component: NucleoFormComponent },
    { path: '', redirectTo : '/nucleo/lista', pathMatch: 'full' }
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NucleoRoutingModule { }
