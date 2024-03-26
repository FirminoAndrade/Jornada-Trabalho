import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IDiaria } from '../model/diaria';

const URL = environment.URLPROD

@Injectable({
  providedIn: 'root'
})
export class DiariaService {
  diaria: any;

  constructor(private http: HttpClient,private _snack: MatSnackBar) {}


  public listarDiariasServicePorUsuario(id_usuario: string): Observable<any> {
    return this.http.get<any>(URL + "diaria?usuario=" + id_usuario);
  }

  public criarDiariaService(id_usuario: string, diaria: IDiaria) {
    return this.http.post(URL + 'diaria?usuario=' + id_usuario, diaria);
  }

  public buscarPorId(id: string): Observable<IDiaria> {
    return this.http.get<IDiaria>(URL + 'diaria/' + id);
  }

  public updateDiariaService(diaria: IDiaria) {
    return this.http.put(URL + 'diaria/' + diaria.id, diaria);
  }

  public deleteDiariaService(id: string): Observable<any> {
    return this.http.delete(URL + 'diaria/' + id);
  }

  public quantidadeDiarias(): Observable<any> {
    return this.http.get(URL + 'diaria/quantidade');
  }

  public mensagem(msg: string): void {
    this._snack.open(msg, 'ok', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
    });
  }
}
