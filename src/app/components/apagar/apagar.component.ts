import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDiaria } from 'src/app/model/diaria';
import { DiariaService } from 'src/app/service/diaria.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-apagar',
  templateUrl: './apagar.component.html',
  styleUrls: ['./apagar.component.css']
})
export class ApagarComponent {

  diaria: IDiaria = {
    atividade: '',
    numero_veiculo: '',
    linha: 0,
    km_inicial: 0,
    km_final: 0,
    hora_inicial: '',
    hora_final: '',
    data: '',
    valor_depositado: '',
    numero_passageiro: 0,
    observacao: ''
   };

   id_usuario: any;


  constructor(private serviceDiaria: DiariaService,private serviceUsuario: UsuarioService, private route: ActivatedRoute, private router: Router){

  }

  ngOnInit(): void {
   this.id_usuario = this.serviceUsuario.usuario.id;
   this.diaria.id = this.route.snapshot.paramMap.get("id")!;
   this.buscarPorId();
  }

  public buscarPorId(): void {
    this.serviceDiaria.buscarPorId(this.diaria.id!).subscribe((resposta) => {
      this.diaria = resposta;
    })
  }

  public apagarDiaria(): void {
    this.serviceDiaria.deleteDiariaService(this.diaria.id!).subscribe((reposta) => {
      this.router.navigate(['/listar/' + this.id_usuario]);
      this.serviceDiaria.mensagem("Diaria apagada com sucesso!")
    },
    (err) => {

      }
    )
  }

   public navegarParaListaDiarias(){
    this.router.navigate(['/listar/' + this.id_usuario]);
  }
}
