import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  pokemons_details: any;
  name: string;
  url = 'https://pokeapi.co/api/v2/pokemon/';


  species: any;
  color_background: any;
  color_abilities_array: any;
  color_abilities: any;

  constructor(private pokeService: PokemonService, private utilService: UtilService, private route: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    let url_pokemon = ''.concat(this.url, this.name);
    this.getPokemonDetails(url_pokemon);
  }

  getPokemonDetails(url: string) {
    this.pokeService.getPokemon(url).subscribe(
      data => {
        this.pokemons_details = data;
        console.log(this.pokemons_details);
        this.getPokemonSpecies(this.pokemons_details.species.url)
      },
      err => {
        console.log(err);
      },
      () => { }
    );
  }

  getPokemonSpecies(url_species) {
    this.pokeService.getPokemonsSpecies(url_species).subscribe(
      data => {
        this.species = data;
        this.colorBackground(this.utilService.hexToRgb(this.utilService.getColourNameToHex(this.species.color.name)));
        this.color_abilities_array = this.utilService.hexToRgb(this.utilService.getColourNameToHex(this.species.color.name));
        this.colorAbilities(this.color_abilities_array);
      },
      err => {
        console.log(err);
      });
  }

  colorAbilities(rgb) {
    let r = rgb[0] - 120 > 0 ? rgb[0] - 120 : 0;
    let g = rgb[1] - 100 > 0 ? rgb[1] - 100 : 0;
    let b = rgb[2] - 80 > 0 ? rgb[2] - 80 : 0;

    this.color_abilities = "rgb(" + r + "," + g + "," + b + ")";
  }

  colorBackground(rgb) {
    let r = rgb[0] + 80 < 255 ? rgb[1] + 80 : 255;
    let g = rgb[1] + 60 < 255 ? rgb[1] + 60 : 255;
    let b = rgb[2] + 50 < 255 ? rgb[2] + 50 : 255;

    this.color_background = "linear-gradient(to bottom, rgb(" + r + "," + g + "," + b + ") 10%, rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ") 100%)";

  }
}
