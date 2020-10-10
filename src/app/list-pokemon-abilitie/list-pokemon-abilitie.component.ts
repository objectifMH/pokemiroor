import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { UtilService } from '../services/util.service';

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

  constructor(private pokeService: PokemonService, private utilService: UtilService,
              private route: ActivatedRoute, private router: Router) {

    let url = "";
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const url_val = val.url;

        // Split 
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
          this.abilities.sort(function compare(a, b) {
            if (a['name'] < b['name'])
              return -1;
            if (a['name'] > b['name'])
              return 1;
            return 0;
          });

          this.next = data['next'];
          this.previous = data['previous'];

          // Next : 
          if (this.next) {
            let inter = this.next.split('?')[1].split('&')
            this.offset_next = inter[0].split('=')[1];
            this.limit_next = inter[1].split('=')[1];
          }

          // Previous :
          if (this.previous) {
            let inter = this.previous.split('?')[1].split('&')
            this.offset_previous = inter[0].split('=')[1];
            this.limit_previous = inter[1].split('=')[1];
          }

          this.pokemons_abilities = [];
          this.abilities.map(ability => this.getPokemonsByAbility(ability['name']));
        }
      },
      err => {
        console.log(err);
      },
      () => { }
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
        this.pokemons_abilities = this.utilService.sortAsc(this.pokemons_abilities, 'ability');
      }
    );
  }
}
