import { Component, OnInit } from '@angular/core';
import { InitService } from './init.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'meu-projeto-angular8';
  mensagem = "";
  
  constructor(private http: HttpClient){
     console.log('--EXECUTANDO O APP.COMPONENT--') ;
          console.log('--EXECUTANDO O APP.COMPONENT--');  

    }

    ngOnInit(){

    // console.log("🧩 AppComponent: ngOnInit chamado");

    // console.log("Init carregado:", this.meuSevico.isCarregado());

    // this.mensagem = this.meuSevico.getMensagem();
    // console.log(this.mensagem+'mensagemmmmmm');


     this.http.get('https://jsonplaceholder.typicode.com/posts/1')
    .subscribe(res => {
      console.log("📥 Resposta da API:", res);
    });


  }
  
}
