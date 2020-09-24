import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { HttpClientModule } from '@angular/common/http';
import { ListPokemonTypeComponent } from './list-pokemon-type/list-pokemon-type.component';
import { FormsModule } from '@angular/forms';
import { PokemonsTypesComponent } from './pokemons-types/pokemons-types.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ListPokemonComponent,
    ListPokemonTypeComponent,
    PokemonsTypesComponent,
    PokemonComponent,
    PokemonDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
