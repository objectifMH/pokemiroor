import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  url_base = 'https://pokeapi.co/api/v2/';

  constructor(private httpClient: HttpClient) { }

  public getUrlBaseImg() {
    return this.url_base;
  }

  //pokemon : 

  public getPokemonsByPage(offset: string, limit: string) {
    const url = ''.concat(this.url_base, "pokemon/?offset="+offset+"&limit="+limit);
    return this.httpClient.get(url);
  }

  public getPokemon(url: string) {
    return this.httpClient.get(url);
  }

  public getPokemonsSpecies(url: string) {
    return this.httpClient.get(url);
  }

  // types :

  public getTypes() {
    const url = ''.concat(this.url_base, "type/");
    return this.httpClient.get(url);
  }

  public getPokemonByTypes(id: string) {
    const url = ''.concat(this.url_base, "type/",id);
    return this.httpClient.get(url);
  }

  public getAllPokemonByTypes(type: string) {
    const url = ''.concat(this.url_base, "type/",type);
    return this.httpClient.get(url);
  }
}
