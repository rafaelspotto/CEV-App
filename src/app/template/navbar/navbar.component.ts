import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/usuario/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario: Usuario;
  isLoggedIn = false;
  showAdminUser = false;
  private roles: string[] = [];
  isShown = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.getUsuarioAutenticado();
    this.isLoggedIn = this.authService.isAuthenticated();
    this.roles = this.usuario.roles;
    this.showAdminUser = this.roles.includes("ROLE_ADMIN") ? true : false;
  }

  logout(){
    this.authService.encerrarSessao();
    this.router.navigate(['/login'])
  }

}
