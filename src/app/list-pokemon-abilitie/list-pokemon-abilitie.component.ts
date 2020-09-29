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
  next: string;
  previous: string;
  offset: string;
  limit: string;
  offset_next: string;
  limit_next: string;
  offset_previous: string;
  limit_previous: string;

  constructor(private pokeService: PokemonService, private route: ActivatedRoute, private router: Router) {

    let url = "";
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const url_val = val.url;

        //decoupage 
        let suffixe = url_val.split('/');
        this.offset = suffixe[2];
        this.limit = suffixe[3];
        url = ''.concat(this.pokeService.url_base + 'ability?offset=', this.offset, '&limit=', this.limit);
        if (this.offset && this.limit) {
          this.getAbilitiesPokemon(url);
        }

      }
    });
  }

  ngOnInit(): void { }

  getAbilitiesPokemon(url) {
    this.pokeService.getAbilities(url).subscribe(
      data => {

        if (this.next !== data['next'] && this.previous !== data['previous']) {
          this.abilities = data['results'];
          this.next = data['next'];
          this.previous = data['previous'];

          //decoupage next : 
          if (this.next) {
            let inter = this.next.split('?')[1].split('&')
            this.offset_next = inter[0].split('=')[1];
            this.limit_next = inter[1].split('=')[1];
            console.log("Decoupage next", this.offset_next, this.limit_next, this.next, this.previous);
          }

          //previous :
          if (this.previous) {
            let inter = this.previous.split('?')[1].split('&')
            this.offset_previous = inter[0].split('=')[1];
            this.limit_previous = inter[1].split('=')[1];
          }
          
          this.pokemons_abilities = [];
          this.abilities.map(ability => this.getPokemonsByAbility(ability['name']));

        }
        else{
          console.log("on y etait déja avant" , this.abilities, data['results']);
        }
      },
      err => {
        console.log(err);
      },
      () => {
      }
    );
  }

  getPokemonsByAbility(name: string) {
    this.pokeService.getPokemonByAbility(name).subscribe(
      data => {
        this.pokemons_abilities = [...this.pokemons_abilities, { 'ability': name, 'list_pokemons': data['pokemon'].slice(0, 8), 'total': data['pokemon'].length }];
      },
      err => {
        console.log(err);
      },
      () => {
        //console.log(this.abilities, this.pokemons_abilities);
      }
    );
  }

}
