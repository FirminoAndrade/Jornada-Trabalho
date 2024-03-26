import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hide = true;
  matricula!: string;
  senha!: string;
  usuario!: IUsuario;
  private token: any;

  constructor(private router: Router, public service: UsuarioService) {}

  ngOnInit(): void {}

  submitLogin() {
    this.service.validarSenha(this.matricula, this.senha).subscribe({
      next: (resposta) => {
        this.token = resposta;
        if (this.token === true) {
          this.service.buscarPorMatricula(this.matricula).subscribe({
            next: (resposta) => {
              this.usuario = resposta;
              this.service.usuario = resposta;
              this.router.navigate(['/home']);
            },error: (err) => {},
          });
        }
      },
      error: (err) => {
        this.service.mensagem(
          'Usuário não encontrado, Matricula ou Senha incorreto!'
        );
      },
    });
  }
}
