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


export function initApp(initService: InitService) {
  return () => initService.initialize();
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
      provide: HTTP_INTERCEPTORS,
      useClass: LogInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
