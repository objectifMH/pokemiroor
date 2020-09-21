import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPokemonTypeComponent } from './list-pokemon-type/list-pokemon-type.component';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { MainComponent } from './main/main.component';
import { PokemonComponent } from './pokemon/pokemon.component';


const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'pokemon', component: PokemonComponent},
  {path: 'list', component: ListPokemonComponent},
  {path: 'types', component: ListPokemonTypeComponent},
  {path: '**', redirectTo: '/main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
