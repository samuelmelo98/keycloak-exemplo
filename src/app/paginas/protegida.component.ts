import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'teste-root',
  templateUrl: './teste.component.html'
})
export class ProtegidaComponent{
  title = 'Pagina Teste';
  mensagem = "";
  
  constructor(private http: HttpClient){
     console.log('Pagina teste!!!') ;     
  }
  
}
