import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { InitService } from '../init.service';
import { KeycloakService } from '../shared/services/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private initService: InitService,
    private router: Router
  ) {
    console.log("🛡️ AuthGuard: instanciado");
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    //console.log("➡️ Guard executado. Verificando InitService...");

    // const carregado = this.initService.isCarregado();
    // console.log("   - Inicialização concluída?", carregado);

    // if (!carregado) {
    //   console.log("❌ InitService não está pronto. Bloqueando rota!");
    //   this.router.navigate(['/']);
    //   return false;
    // }

    // console.log("✔ InitService OK. Rota liberada!");
    // return true;

    // const token = this.keycloak.getToken();
    // if (!token) {
    //   window.location.href = 'https://keycloak-hom.mpmt.mp.br';
    //   return false;
    // }
    console.log('Guard - usuario autenticado ? '+KeycloakService.isLoggedIn);
    return  KeycloakService.isLoggedIn();
  }
}
