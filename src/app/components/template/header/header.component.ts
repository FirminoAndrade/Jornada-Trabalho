import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  id ='';
  nome: string = '';

  constructor(private service: UsuarioService) {}

  ngOnInit(): void {
    this.id = this.service.usuario && this.service.usuario.id ?  this.service.usuario.id : '';
    this.buscarNome();
  }

  buscarNome(): void {
    this.service.buscarPorId(this.id).subscribe((reposta) => {
      this.nome = reposta.nome;
    });
  }
}
