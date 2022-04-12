import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaidaFormComponent } from './saida-form/saida-form.component';
import { SaidaListaComponent } from './saida-lista/saida-lista.component';
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth.guard'
import { SaidaVegetalFormComponent } from './saida-vegetal-form/saida-vegetal-form.component';


const routes: Routes = [
  { path: 'saida', canActivate: [AuthGuard], component: LayoutComponent, children: [
    { path: 'form', component: SaidaFormComponent },
    { path: 'form/:id' , component: SaidaFormComponent },
    { path: 'lista', component: SaidaListaComponent },
    { path: '', redirectTo: '/saida/lista', pathMatch: 'full' }

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaidaRoutingModule { }
