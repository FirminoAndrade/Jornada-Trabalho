import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApagarComponent } from './components/apagar/apagar.component';
import { AtualizarFecharComponent } from './components/atualizar-fechar/atualizar-fechar.component';
import { DiariaComponent } from './components/diaria/diaria.component';
import { HomeComponent } from './components/home/home.component';
import { ListaDiariaComponent } from './components/lista-diaria/lista-diaria.component';
import { LoginComponent } from './components/login/login.component';
import { RelatorioComponent } from './components/relatorio/relatorio.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'diaria/:id', component: DiariaComponent },
  { path: 'listar/:id', component: ListaDiariaComponent },
  { path: 'atualizar/fechar/:id', component: AtualizarFecharComponent },
  { path: 'relatorio/:id', component: RelatorioComponent },
  { path: 'apagar/:id', component: ApagarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
