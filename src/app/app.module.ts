import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component'
import { EntradaModule } from './entrada/entrada.module';
import { EntradaService } from './entrada.service'
import { VegetalModule } from './vegetal/vegetal.module';
import { VegetalService } from './vegetal.service'
import { SaidaModule } from './saida/saida.module'
import { SaidaService } from './saida.service';
import { UsuarioService } from './usuario.service';
import { UsuarioModule } from './usuario/usuario.module';
import { NucleoService } from './nucleo.service';
import { NucleoModule } from './nucleo/nucleo.module';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component'
import { AuthService } from './auth.service';
import { authInterceptorProviders } from './token.interceptor';
import {DatePipe} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import  { ChartsModule } from 'ng2-charts';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
    VegetalModule,
    EntradaModule,
    SaidaModule,
    UsuarioModule,
    NucleoModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [
    VegetalService,
    EntradaService,
    SaidaService,
    UsuarioService,
    NucleoService,
    AuthService,
    [authInterceptorProviders],
    { provide: LOCALE_ID, useValue: 'pt' },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
