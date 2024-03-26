import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IDiaria } from 'src/app/model/diaria';
import { DiariaService } from 'src/app/service/diaria.service';

@Component({
  selector: 'app-lista-diaria',
  templateUrl: './lista-diaria.component.html',
  styleUrls: ['./lista-diaria.component.css'],
})
export class ListaDiariaComponent implements OnInit {
  displayedColumns: string[] = [
    'atividade',
    'numero_veiculo',
    'linha',
    'horario_inicial',
    'data',
    'acoes'
  ];

  id: string = '';
  diarias: IDiaria[] = [];
  qtdDiarias!: number;
  dataSource!: MatTableDataSource<IDiaria>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: DiariaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.listarDiarias();
    this.quantidadeDiarias();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public listarDiarias() {
    this.service.listarDiariasServicePorUsuario(this.id).subscribe((resposta) => {
        this.dataSource = new MatTableDataSource(resposta);
        this.dataSource.paginator = this.paginator;
      });
  }

  public quantidadeDiarias() {
    this.service.quantidadeDiarias().subscribe((resposta) => {
      this.qtdDiarias = resposta;
    });
  }
}
