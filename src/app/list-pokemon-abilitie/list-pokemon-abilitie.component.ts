import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-list-pokemon-abilitie',
  templateUrl: './list-pokemon-abilitie.component.html',
  styleUrls: ['./list-pokemon-abilitie.component.scss']
})
export class ListPokemonAbilitieComponent implements OnInit {

  
  abilities: string[];
  pokemons_abilities = [];
  pokemons_abilities_aux = [];
  next: string;
  previous: string;
  offset_next: string;
  limit_next: string;
  offset_previous: string;
  limit_previous: string;

  constructor(private pokeService: PokemonService, private route: ActivatedRoute, private router: Router) { 
    
    let url ="";
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const url_val = val.url;

        //decoupage 
        let suffixe = url_val.split('/');
        url = ''.concat(this.pokeService.url_base+'ability?offset=', suffixe[2], '&limit=', suffixe[3]);
        this.getAbilitiesPokemon(url);
      }
    });

  }

  ngOnInit(): void { }

  getAbilitiesPokemon(url) {
    this.pokeService.getAbilities(url).subscribe(
      data => {
        
        this.abilities = data['results'];
        this.next = data['next'];
        this.previous = data['previous'];

        //decoupage next : 
        if ( this.next){
          
          let inter = this.next.split('?')[1].split('&')
          this.offset_next = inter[0].split('=')[1];
          this.limit_next = inter[1].split('=')[1];
          console.log("Decoupage next" , this.offset_next, this.limit_next, this.next, this.previous);
        }

        //previous :
        if ( this.previous){
          let inter = this.previous.split('?')[1].split('&')
          this.offset_previous = inter[0].split('=')[1];
          this.limit_previous = inter[1].split('=')[1];
        }

      },
      err => {
        console.log(err);
      },
      () => {

        this.pokemons_abilities_aux = [];
        this.abilities.map(ability => this.getPokemonsByAbility(ability['name']))
      }
    );
  }

  getPokemonsByAbility(name: string) {
    this.pokeService.getPokemonByAbility(name).subscribe(
      data => {
        this.pokemons_abilities_aux = [...this.pokemons_abilities_aux, { 'ability': name, 'list_pokemons': data['pokemon'].slice(0, 8) }];
      },
      err => {
        console.log(err);
      },
      () => {
        console.log(this.abilities, this.pokemons_abilities_aux);
        this.pokemons_abilities = this.pokemons_abilities_aux;
      }
    );
  }

}
