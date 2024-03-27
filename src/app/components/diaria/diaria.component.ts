import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDiaria } from 'src/app/model/diaria';
import { DiariaService } from 'src/app/service/diaria.service';
import { UsuarioService } from 'src/app/service/usuario.service';

interface IAtividade {
  valor: string;
  viewValor: string;
}

@Component({
  selector: 'app-diaria',
  templateUrl: './diaria.component.html',
  styleUrls: ['./diaria.component.css']
})
export class DiariaComponent implements OnInit {

  atividade: IAtividade[] = [
    { valor: 'SIM', viewValor: 'SIM' },
    { valor: 'FOLGA', viewValor: 'FOLGA' },
    { valor: 'ATESTADO MÉDICO', viewValor: 'ATESTADO MÉDICO' },
    { valor: 'FALTA', viewValor: 'FALTA' },
  ];

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

  id: string = '';

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

  constructor(private serviceDiaria: DiariaService, private router: Router,private route: ActivatedRoute,private serviceUsuario: UsuarioService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log(this.id)
    this.diaria.data = this.dataConvertida;
    this.diaria.hora_inicial = this.horaAtual;
  }

  public criarDiaria(): void {
    this.diaria.data = this.dataConvertida;
    this.serviceDiaria.criarDiariaService(this.id, this.diaria).subscribe(
      (resposta) => {
        this.router.navigate(['/listar/' + this.id]);
        this.serviceDiaria.mensagem("Diária adicionada com sucesso!");
      },
      (err) => {
        for (let i = 0; i < err.error.errors.length; i++) {
          this.serviceDiaria.mensagem('Campos Obrigatórios!');
        }
      }
    );
  }

  public navegarParaHome() {
    this.router.navigate(['/home']);
  }
}
