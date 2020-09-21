import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PokemonComponent } from './pokemon/pokemon.component';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { HttpClientModule } from '@angular/common/http';
import { ListPokemonTypeComponent } from './list-pokemon-type/list-pokemon-type.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PokemonComponent,
    ListPokemonComponent,
    ListPokemonTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
