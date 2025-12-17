import { Injectable } from '@angular/core';
import * as Keycloak from 'keycloak-js';
import { KeycloakInstance, KeycloakInitOptions } from 'keycloak-js';

@Injectable({
  providedIn: 'root' // 👈 garante singleton global
})
export class KeycloakServiceSingleton {

  private keycloakAuth: Keycloak.KeycloakInstance;
  private initialized = false;

  init(): Promise<boolean> {

    return new Promise((resolve, reject) => {

      if (this.initialized) {
        return resolve(true);
      }

      this.keycloakAuth = Keycloak({
        url: 'http://localhost:8080',
        realm: 'teste',
        clientId: 'frontend-angular'
      });

      this.keycloakAuth.init({
        onLoad: 'login-required',
        pkceMethod: 'S256',
        checkLoginIframe: false
      })
      .then(authenticated => {
        this.initialized = true;
        resolve(authenticated);
      })
      .catch(err => reject(err));
    });
  }

  getToken(): string {
    if (this.keycloakAuth && this.keycloakAuth.token) {
      return this.keycloakAuth.token;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.keycloakAuth && this.keycloakAuth.token ? true : false;
  }

  logout(): void {
    if (this.keycloakAuth) {
      this.keycloakAuth.logout({
        redirectUri: 'http://localhost:4200'
      });
    }
  }

  updateToken(minValidity: number): Promise<boolean> {
    if (!this.keycloakAuth) {
      return Promise.resolve(false);
    }
    return this.keycloakAuth.updateToken(minValidity);
  }
}
