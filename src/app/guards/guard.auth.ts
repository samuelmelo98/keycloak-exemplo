import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { InitService } from '../init.service';
import { KeycloakServiceSingleton2 } from '../shared/keycloak-singleton2.service';

/*
//Teste seu keycloak servidor de autorizações.
//http://localhost:8080/realms/teste/.well-known/openid-configuration

*/


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
    console.log('Guard - usuario autenticado ? '+KeycloakServiceSingleton2.isLoggedIn + KeycloakServiceSingleton2.isInitialized);
    console.log(KeycloakServiceSingleton2.getToken.toString);

    console.log(
  'Guard - usuario autenticado ? ',
  KeycloakServiceSingleton2.isLoggedIn(),
  ' | inicializado ? ',
  KeycloakServiceSingleton2.isInitialized()
);

console.log(
  'Token:',
  KeycloakServiceSingleton2.getToken()
);

    return  KeycloakServiceSingleton2.isLoggedIn();
  }
}
