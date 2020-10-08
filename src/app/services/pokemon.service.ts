import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  url_base = 'https://pokeapi.co/api/v2/';
  my_pokedex: BehaviorSubject<any>;
  url_img_map: BehaviorSubject<string>;

  constructor(private httpClient: HttpClient) {
    this.my_pokedex = new BehaviorSubject([]);
    this.url_img_map = new BehaviorSubject("");
   }

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

  public getPokemonsEvolutionChain(url: string) {
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

  // abilities :

  public getAbilities(url: string) {
    return this.httpClient.get(url);
  }

  public getPokemonByAbility(id: string) {
    const url = ''.concat(this.url_base, "ability/",id);
    return this.httpClient.get(url);
  }

  
  public getAllPokemonByAbilities(ability: string) {
    const url = ''.concat(this.url_base, "ability/",ability);
    return this.httpClient.get(url);
  }

  // My pokedex :

  public setMyPokedex(resultat) {
    this.my_pokedex.next(resultat);
  }

  public getMyPokedex() {
    return this.my_pokedex.asObservable();
  }

  // Map 

  public setUrlImgMap(resultat) {
    this.url_img_map.next(resultat);
  }

  public getUrlImgMap() {
    return this.url_img_map.asObservable();
  }

}
