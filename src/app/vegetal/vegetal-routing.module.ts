import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VegetalFormComponent } from './vegetal-form/vegetal-form.component'
import { VegetalListaComponent } from './vegetal-lista/vegetal-lista.component';
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth.guard'


const routes: Routes = [
  { path : 'vegetal' , component: LayoutComponent, 
    canActivate: [AuthGuard] ,children: [
    
    { path: 'form' , component: VegetalFormComponent },
    { path: 'form/:id' , component: VegetalFormComponent },
    { path: 'lista', component: VegetalListaComponent },
    { path: '', redirectTo : '/vegetal/lista', pathMatch: 'full' }

  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VegetalRoutingModule { }
