import { AfterViewChecked, AfterViewInit, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit  {


  @Input()
  input_pokemon: any;

  @Input()
  width_img_pokemon: string;

  @Input()
  height_img_pokemon: string;

  @Input()
  show_abilities: boolean;

  pokemon: any;
  species: any;
  color_background: any;
  color_abilities_array: any;
  color_abilities: any;
  prix: string;

  my_pokedex: any;
  isOnCart: boolean;

  constructor(
    private pokeService: PokemonService,
    private utilService: UtilService,
    private router: Router) { 
      this.getMyPokedex();
    }

  ngOnInit(): void {
    this.getPokemon();
  }

  ngDoCheck() {
    this.verifPokemonOnCart();
  }

  getPokemon() {
    this.pokeService.getPokemon(this.input_pokemon.url).subscribe(
      data => {
        this.pokemon = data;
        this.getPokemonSpecies(this.pokemon.species.url);
      },
      err => {
        console.log(err);
      },
      () => {
        this.prix = this.utilService.getPrix(this.pokemon.id);
      });
  }

  getPokemonSpecies(url_species) {
    this.pokeService.getPokemonsSpecies(url_species).subscribe(
      data => {
        this.species = data;
        this.color_background = this.utilService.colorBackground(this.utilService.hexToRgb(this.utilService.getColourNameToHex(this.species.color.name)));
        this.color_abilities_array = this.utilService.hexToRgb(this.utilService.getColourNameToHex(this.species.color.name));
        this.color_abilities = this.utilService.colorAbilities(this.color_abilities_array);
      },
      err => {
        console.log(err);
      });
  }

  getMyPokedex() {
    this.pokeService.getMyPokedex().subscribe(
      data => {
        this.my_pokedex = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  verifPokemonOnCart() {
    if (this.my_pokedex.length > 0 && this.pokemon)
    {
      return this.isOnCart = (this.my_pokedex.filter( poke => poke.id === this.pokemon.id).length > 0 ? true : false);
      }
    else{
      return this.isOnCart = false;
    }
  }

}