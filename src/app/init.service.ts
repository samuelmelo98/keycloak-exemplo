import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class InitService {

  private carregado: boolean = false;

  constructor() {
    console.log("🔧 InitService: constructor() chamado");
  }

  initialize(): Promise<void> {
    console.log("🚀 InitService: initialize() iniciado...");

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("✔ InitService: initialize() finalizado!");
        this.carregado = false;
        resolve();
      }, 2000);
    });
  }

  isCarregado(): boolean {
    return this.carregado;
  }

  getMensagem(): string {
    return "Serviço consumido depois da inicialização!";
  }
}
