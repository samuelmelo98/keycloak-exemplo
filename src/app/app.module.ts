import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';


import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InitService } from './init.service';

import { LogInterceptor } from './log.interceptor';
import { ProtegidaComponent } from './paginas/protegida.component';
import { TesteComponent } from './paginas/teste.component';
import { HomeComponent } from './paginas/home.component';
import { KeycloakServiceSingleton } from './shared/keycloak-singleton.service';


export function initApp(initService: InitService) {
  return () => initService.initialize();
}

export function initializeKeycloak(keycloakSigleton: KeycloakServiceSingleton) {
  return () => '';//keycloakSigleton.init();
}




@NgModule({
  declarations: [
    AppComponent,
    ProtegidaComponent,
    TesteComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  
  ],
  providers: [
    {
    provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [InitService],
      multi: true
  },
  {
     provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [KeycloakServiceSingleton],
      multi: true
  },
  {
      provide: HTTP_INTERCEPTORS,
      useClass: LogInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
