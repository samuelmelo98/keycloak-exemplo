import * as  Keycloak from 'keycloak-js';

export class KeycloakService {

  private static keycloakAuth: Keycloak.KeycloakInstance;

  static init(): Promise<boolean> {
    console.log('🔧 [Keycloak] Inicializando...');

    return new Promise((resolve, reject) => {

      const keycloak = Keycloak({
        url: 'http://localhost:8080',
        realm: 'teste',
        clientId: 'frontend-angular'
      });

      keycloak.init({
        onLoad: 'login-required',
        pkceMethod: 'S256',
        checkLoginIframe: false
      }).then(authenticated => {

        console.log('✔ [Keycloak] Autenticado:', authenticated);
        KeycloakService.keycloakAuth = keycloak;
        resolve(authenticated);

      }).catch(err => {
        console.error('❌ [Keycloak] Erro ao iniciar', err);
        reject(err);
      });

    });
  }

  static getToken(): string {
    return KeycloakService.keycloakAuth.token;
  }

  static isLoggedIn(): boolean {
    return !!KeycloakService.keycloakAuth.token;
  }

  static logout() {
    KeycloakService.keycloakAuth.logout({
      redirectUri: 'http://localhost:4200'
    });
  }
}
