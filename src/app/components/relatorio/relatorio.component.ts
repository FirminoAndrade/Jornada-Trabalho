import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IDiaria } from 'src/app/model/diaria';
import { DiariaService } from 'src/app/service/diaria.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'],
})
export class RelatorioComponent implements OnInit {
  displayedColumns: string[] = ['hora_inicial', 'hora_final'];

  diaria: IDiaria = {
    atividade: '',
    numero_veiculo: 0,
    linha: 0,
    km_inicial: 0,
    km_final: 0,
    hora_inicial: '',
    hora_final: '',
    data: '',
    valor_depositado: '',
    numero_passageiro: 0,
    observacao: '',
  };

  private id = '';
  nome!: string;
  matricula!: string;
  kilometragemTotal!: number;

  constructor(
    private serviceDiaria: DiariaService,
    private router: Router,
    private route: ActivatedRoute,
    private serviceUsuario: UsuarioService
  ) {}

  ngOnInit(): void {
    this.diaria.id = this.route.snapshot.paramMap.get('id')!;
    this.id = this.serviceUsuario.usuario && this.serviceUsuario.usuario.id ?  this.serviceUsuario.usuario.id : '';
    this.buscarPorId();
    this.buscarUsuario();
  }

  buscarUsuario(): void {
    this.serviceUsuario.buscarPorId(this.id).subscribe((reposta) => {
      this.nome = reposta.nome;
      this.matricula = reposta.matricula;
    });
  }

  public buscarPorId(): void {
    this.serviceDiaria.buscarPorId(this.diaria.id!).subscribe((resposta) => {
      this.diaria.atividade = resposta.atividade;
      this.diaria.numero_veiculo = resposta.numero_veiculo;
      this.diaria.linha = resposta.linha;
      this.diaria.km_inicial = resposta.km_inicial;
      this.diaria.km_final = resposta.km_final;
      this.diaria.hora_inicial = resposta.hora_inicial;
      this.diaria.hora_final = resposta.hora_final;
      this.diaria.data = resposta.data;
      this.diaria.valor_depositado = resposta.valor_depositado;
      this.diaria.numero_passageiro = resposta.numero_passageiro;
      this.diaria.observacao = resposta.observacao;
      this.kilometragemTotal = resposta.km_final - resposta.km_inicial;
    });
  }

  public voltar(): void {
    this.router.navigate(['/listar/' + this.id]);
  }
}
