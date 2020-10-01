import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { PokemonService } from '../services/pokemon.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  pokemons_details: any;
  id: string;
  url = 'https://pokeapi.co/api/v2/pokemon/';


  species: any;
  evolution: any;
  color_background: any;
  color_abilities_array: any;
  color_abilities: any;

  baby_pokemon: any;
  evolve_pokemon: any;
  super_evolve_pokemon: any;

  evolution_bool: boolean;

  constructor(private pokeService: PokemonService, private utilService: UtilService, private route: ActivatedRoute, private router: Router,) {
    let url = "";
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const url_val = val.url;
        
        this.id = this.route.snapshot.paramMap.get('id');
        let url_pokemon = ''.concat(this.url, this.id);
        this.getPokemonDetails(url_pokemon);
      }
    });
   }

  ngOnInit(): void {
  }

  getPokemonDetails(url: string) {
    this.pokeService.getPokemon(url).subscribe(
      data => {
        this.pokemons_details = data;
        console.log("getPokemon > ", this.pokemons_details);
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
        console.log("getPokemonsSpecies > ", this.species);
        this.colorBackground(this.utilService.hexToRgb(this.utilService.getColourNameToHex(this.species.color.name)));
        this.color_abilities_array = this.utilService.hexToRgb(this.utilService.getColourNameToHex(this.species.color.name));
        this.colorAbilities(this.color_abilities_array);

        this.evolution_bool = data['evolution_chain'] ? true : false;
        if( data['evolution_chain'])
        this.getEvolutionChain(data['evolution_chain'].url);
      },
      err => {
        console.log(err);
      });
  }

  getEvolutionChain(url_evolution) {
    this.pokeService.getPokemonsEvolutionChain(url_evolution).subscribe(
      data => {
        this.evolution = data;
        console.log("getPokemonsEvolutionChain > ", data);
        //console.log("Baby > ", data['chain']['species']);
        
        // Baby : 
        if ( data['chain']['species'] )
        {
          let tab_url_baby = data['chain']['species'].url.split('/');
          let id_baby = tab_url_baby[(tab_url_baby.length)-2];
          this.baby_pokemon = {"name": data['chain']['species'], "url": this.url+id_baby };
          console.log(this.baby_pokemon);
        }

        
        if ( data['chain']['evolves_to'][0]["species"] )
        {
          let tab_url_evolves = data['chain']['evolves_to'][0]["species"].url.split('/');
          let id_evolve = tab_url_evolves[(tab_url_evolves.length)-2];
          this.evolve_pokemon = {"name": data['chain']['evolves_to'][0]["species"], "url": this.url+id_evolve };
          console.log(this.evolve_pokemon);
        }

        if ( data['chain']['evolves_to'][0]['evolves_to'][0] )
        {
          let tab_url_super_evolves = data['chain']['evolves_to'][0]['evolves_to'][0]['species'].url.split('/');
          let id_super_evolve = tab_url_super_evolves[(tab_url_super_evolves.length)-2];
          this.super_evolve_pokemon = {"name": data['chain']['evolves_to'][0]['evolves_to'][0]['species'], "url": this.url+id_super_evolve };
          console.log(this.super_evolve_pokemon);
        }
      },
      err => {
        console.log(err); this.evolution_bool = false;
      },
      () => {
      }
    );
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
