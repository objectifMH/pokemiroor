import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ListPokemonAbilitieComponent } from './list-pokemon-abilitie/list-pokemon-abilitie.component';
import { ListPokemonTypeComponent } from './list-pokemon-type/list-pokemon-type.component';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { MainComponent } from './main/main.component';
import { MapComponent } from './map/map.component';
import { MyPokedexComponent } from './my-pokedex/my-pokedex.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonsAbilitiesComponent } from './pokemons-abilities/pokemons-abilities.component';
import { PokemonsTypesComponent } from './pokemons-types/pokemons-types.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'pokemon', component: PokemonComponent},
  {path: 'list', component: ListPokemonComponent},
  {path: 'types', component: ListPokemonTypeComponent},
  {path: 'abilities/:offset/:limit', component: ListPokemonAbilitieComponent},
  {path: 'abilities', component: ListPokemonAbilitieComponent},
  {path: 'pokemons-types/:type', component: PokemonsTypesComponent},
  {path: 'pokemons-details/:id', component: PokemonDetailsComponent},
  {path: 'pokemons-ability/:ability/:offset/:limit', component: PokemonsAbilitiesComponent},
  {path: 'search', component: SearchComponent},
  {path: 'map', component: MapComponent},
  {path: 'pokedex', component: MyPokedexComponent},
  {path: 'admin', component: AdminComponent},
  {path: '**', redirectTo: '/main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

