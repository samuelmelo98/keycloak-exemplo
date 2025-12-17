import * as Keycloak from 'keycloak-js';

export class KeycloakServiceSingleton2 {

  private static keycloakAuth: Keycloak.KeycloakInstance;
  private static initialized = false;

  static init(): Promise<boolean> {
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
      })
      .then(authenticated => {
        KeycloakServiceSingleton2.keycloakAuth = keycloak;
        KeycloakServiceSingleton2.initialized = true;
        resolve(authenticated);
      })
      .catch(err => reject(err));
    });
  }

//   static isInitialized(): boolean {
//     return KeycloakServiceSingleton2.initialized;
//   }

//   static isLoggedIn(): boolean {
//     return KeycloakServiceSingleton2.initialized &&
//            KeycloakServiceSingleton2.keycloakAuth &&
//            KeycloakServiceSingleton2.keycloakAuth.token
//       ? true
//       : false;
//   }

static isInitialized(): boolean {
    return KeycloakServiceSingleton2.initialized === true;
  }

  static isLoggedIn(): boolean {

    // 🔒 BLINDAGEM TOTAL
    if (!KeycloakServiceSingleton2.initialized) {
      return false;
    }

    if (!KeycloakServiceSingleton2.keycloakAuth) {
      return false;
    }

    if (!KeycloakServiceSingleton2.keycloakAuth.token) {
      return false;
    }

    return true;
  }

  static getToken(): string {
    if (!KeycloakServiceSingleton2.initialized) {
      return null;
    }

    if (!KeycloakServiceSingleton2.keycloakAuth) {
      return null;
    }

    return KeycloakServiceSingleton2.keycloakAuth.token;
  }

  static logout(): void {
    if (KeycloakServiceSingleton2.keycloakAuth) {
      KeycloakServiceSingleton2.keycloakAuth.logout({
        redirectUri: 'http://localhost:4200'
      });
    }
  }

}

