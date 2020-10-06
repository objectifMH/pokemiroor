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

  location = [];
  species: any;
  evolution: any;
  color_background: any;
  color_abilities_array: any;
  color_abilities: any;
  species_color = '';

  prix: string;

  baby_pokemon = [];
  evolve_pokemon = [];
  super_evolve_pokemon = [];

  evolution_bool: boolean;
  isOnCart = false;
  isLocationShow = true;

  constructor(private pokeService: PokemonService, private utilService: UtilService, private route: ActivatedRoute, private router: Router,) {
    let url = "";
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const url_val = val.url;

        this.id = this.route.snapshot.paramMap.get('id');
        let url_pokemon = ''.concat(this.url, this.id);
        
        this.location = [];
        this.location = [...this.location, this.utilService.getRandomInt(24)];  
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
        //console.log("getPokemon > ", this.pokemons_details);
        this.prix = this.utilService.getPrix(this.pokemons_details.id);
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
        this.species_color = this.species.color.name;
        //console.log("getPokemonsSpecies > ", this.species);
        this.color_background = this.utilService.colorBackground(this.utilService.hexToRgb(this.utilService.getColourNameToHex(this.species.color.name)));
        this.color_abilities_array = this.utilService.hexToRgb(this.utilService.getColourNameToHex(this.species.color.name));
        this.color_abilities = this.utilService.colorAbilities(this.color_abilities_array);
        this.evolution_bool = data['evolution_chain'] ? true : false;
        if (data['evolution_chain'])
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
        //console.log("getPokemonsEvolutionChain > ", data);

        // Baby : 

        if (data['chain']['species']) {
          this.baby_pokemon = [];

          let tab_url_baby = data['chain']['species'].url.split('/');
          let id_baby = tab_url_baby[(tab_url_baby.length) - 2];
          this.baby_pokemon = [...this.baby_pokemon, { "name": data['chain']['species']['name'], "url": this.url + id_baby }];
          //console.log(this.baby_pokemon);
        }


        if (data['chain']['evolves_to']) {
          this.evolve_pokemon = [];

          data['chain']['evolves_to'].map(evolve => {
            let tab_url_evolves = evolve.species.url.split('/');
            let id_evolve = tab_url_evolves[(tab_url_evolves.length) - 2];
            this.evolve_pokemon = [...this.evolve_pokemon, { "name": evolve.species.name, "url": this.url + id_evolve }];
          });
          //console.log("evolve_pokemon", this.evolve_pokemon);
        }

        if (data['chain']['evolves_to'].length > 0)
          if (data['chain']['evolves_to'][0]['evolves_to']) {

            this.super_evolve_pokemon = [];

            data['chain']['evolves_to'][0]['evolves_to'].map(evolve => {
              let tab_url_evolves = evolve.species.url.split('/');
              let id_evolve = tab_url_evolves[(tab_url_evolves.length) - 2];
              this.super_evolve_pokemon = [...this.super_evolve_pokemon, { "name": evolve.species.name, "url": this.url + id_evolve }];
            });
            //console.log("super_evolve_pokemon", this.super_evolve_pokemon);
          }
      },
      err => {
        console.log(err); this.evolution_bool = false;
      },
      () => {
        //console.log(" les Evolutions : ", this.baby_pokemon.length, this.evolve_pokemon.length, this.super_evolve_pokemon.length);
      }
    );
  }

  toggleIsOnCart(){
    this.isOnCart = !this.isOnCart;
  }

  toggleLocastionShow(){
    this.isLocationShow = !this.isLocationShow;
  }
}
