import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InitService } from './init.service';
import { KeycloakService } from './shared/services/keycloak.service';

@Injectable()
export class LogInterceptor implements HttpInterceptor {



  constructor(private initService: InitService) {
    console.log("🛡️ LogInterceptor: instanciado");
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes('/realms/')) {
    return next.handle(req);
  }

    console.log("📡 Interceptor: nova requisição detectada →", req.url);

    // console.log("🔍 Consultando InitService:");
    // console.log("   - Inicialização concluída?", this.initService.isCarregado());
    // console.log("   - Mensagem:", this.initService.getMensagem());

    // // Você pode modificar a requisição se quiser:
    // const reqClonada = req.clone({
    //   // setHeaders: {
    //   //   'X-Init-Status': this.initService.isCarregado().toString()
    //   // }

      

      
    // });

    // return next.handle(reqClonada);

     const token = KeycloakService.getToken();

    if (token) {
      console.log(token);
      const authReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
  
}
