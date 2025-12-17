import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { KeycloakService } from './app/shared/services/keycloak.service';

import { KeycloakServiceSingleton } from './app/shared/keycloak-singleton.service';
import { KeycloakServiceSingleton2} from './app/shared/keycloak-singleton2.service';

if (environment.production) {
  enableProdMode();
}

// KeycloakService.init()
//   .then(() => {
//     platformBrowserDynamic()
//       .bootstrapModule(AppModule)
//       .catch(err => console.error(err));
//   })
//   .catch(error => console.error('[Keycloak] Erro ao iniciar', error));


KeycloakServiceSingleton2.init()
  .then(() => {
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch(err => console.error(err));
  })
  .catch(error => console.error('[Keycloak] Erro ao iniciar', error));
