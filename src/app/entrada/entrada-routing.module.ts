import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntradaFormComponent } from './entrada-form/entrada-form.component';
import { EntradaListaComponent } from './entrada-lista/entrada-lista.component';
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth.guard';



const routes: Routes = [
  { path: 'entrada', canActivate: [AuthGuard], component: LayoutComponent, children: [
    { path: 'form', component: EntradaFormComponent },
    { path: 'form/:id' , component: EntradaFormComponent },
    { path: 'lista', component: EntradaListaComponent },  
    { path: '', redirectTo: '/entrada/lista', pathMatch: 'full' }

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradaRoutingModule { }
