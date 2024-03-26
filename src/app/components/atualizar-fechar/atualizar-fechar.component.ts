import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IDiaria } from 'src/app/model/diaria';
import { DiariaService } from 'src/app/service/diaria.service';
import { UsuarioService } from 'src/app/service/usuario.service';

interface IAtividade {
  valor: string;
  viewValor: string;
}

@Component({
  selector: 'app-atualizar-fechar',
  templateUrl: './atualizar-fechar.component.html',
  styleUrls: ['./atualizar-fechar.component.css']
})
export class AtualizarFecharComponent implements OnInit {

  atividade: IAtividade[] = [
    { valor: 'SIM', viewValor: 'SIM' },
    { valor: 'FOLGA', viewValor: 'FOLGA' },
    { valor: 'ATESTADO MÉDICO', viewValor: 'ATESTADO MÉDICO' },
    { valor: 'FALTA', viewValor: 'FALTA' },
  ];

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
	 observacao: ''
  };

  id_usuario: any;
  data = new Date();

  dia = String(this.data.getDate()).padStart(2, '0');
  mes = String(this.data.getMonth() + 1).padStart(2, '0');
  ano = this.data.getFullYear();
  dataAtual = `${this.dia}/${this.mes}/${this.ano}`
  dataConvertida : string = String(this.dataAtual);

  hora =  String(this.data.getHours()).padStart(2,'0');
  minutos =  String(this.data.getMinutes()).padStart(2,'0');
  horaAtual = `${this.hora}:${this.minutos}`
  horaConvertida : string = String(this.horaAtual);
  prefix: any;

  constructor(private serviceDiaria: DiariaService, private router: Router,private route: ActivatedRoute,private serviceUsuario: UsuarioService) {}

  ngOnInit(): void {
    this.id_usuario = this.serviceUsuario.usuario.id;
    this.diaria.id = this.route.snapshot.paramMap.get("id")!;
    this.diaria.data = this.dataConvertida;
    this.diaria.hora_final = this.horaAtual;
    this.buscarPorId();
  }

  public buscarPorId(): void {
    this.serviceDiaria.buscarPorId(this.diaria.id!).subscribe((resposta) => {
      this.diaria.atividade = resposta.atividade;
      this.diaria.numero_veiculo = resposta.numero_veiculo;
      this.diaria.linha = resposta.linha;
      this.diaria.km_inicial = resposta.km_inicial;
      this.diaria.km_final = resposta.km_final;
      this.diaria.hora_inicial = resposta.hora_inicial;
      this.diaria.data = resposta.data;
      this.diaria.valor_depositado = resposta.valor_depositado;
      this.diaria.numero_passageiro = resposta.numero_passageiro;
      this.diaria.observacao = resposta.observacao;
    });
  }

  public atualizarDiaria(): void {
     this.serviceDiaria.updateDiariaService(this.diaria).subscribe((resposta) => {
      this.router.navigate(["/listar/"+ this.id_usuario]);
      this.serviceDiaria.mensagem("Dados atualizado com sucesso!")
     }, err => {
      this.serviceDiaria.mensagem("Validar se todos os campos estão preenchidos corretamente!")
     })
  }

  public navegarParaListaOperecoes(){
    this.router.navigate(["/listar/"+ this.id_usuario]);
  }
}
