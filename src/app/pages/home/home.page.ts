import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Asegúrate de tener la ruta correcta
import { Router, NavigationEnd } from '@angular/router'; // Importa Router para redireccionar
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  isProfileMenuOpen: boolean = false; // Controlar si el menú está abierto o cerrado
  isLoggedIn: boolean = false;
  userName: string; // Variable para almacenar el nombre del usuario
  private routerSubscription!: Subscription;

  constructor(
    private authService: AuthService, 
    private router: Router, 
  ) {
    this.userName = this.authService.getUserName(); // Método para obtener el nombre del usuario
    this.isLoggedIn = !!this.userName;
  }

  ngOnInit() {
    // Suscribirse a los eventos de navegación
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeProfileMenu(); // Cerrar el menú al cambiar de página
      }
    });
  }
  
  ngOnDestroy() {
    // Cancelar la suscripción para evitar fugas de memoria
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }  
  
  // Método para cerrar sesión
  logout() {
    this.authService.logout(); // Lógica para cerrar sesión
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }

  login() {
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen; // Alternar el estado de apertura/cierre del menú
  }

  closeProfileMenu() {
    this.isProfileMenuOpen = false; // Cerrar el menú al presionar fuera de él
  }
}
