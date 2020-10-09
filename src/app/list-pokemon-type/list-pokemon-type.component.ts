import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-list-pokemon-type',
  templateUrl: './list-pokemon-type.component.html',
  styleUrls: ['./list-pokemon-type.component.scss']
})
export class ListPokemonTypeComponent implements OnInit {

  types: string[];
  pokemons_types = [];
  pokemons_types_aux = [];

  constructor(private pokeService: PokemonService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getTypesPokemon();
  }

  getTypesPokemon() {
    this.pokeService.getTypes().subscribe(
      data => {
        this.types = data['results'];
        this.types.sort(function compare(a, b) {
          if (a['name'] < b['name'])
            return -1;
          if (a['name'] > b['name'])
            return 1;
          return 0;
        });
      },
      err => {
        console.log(err);
      },
      () => {
        this.types.map(type => this.getPokemonsByType(type['name']))
      }
    );
  }

  getPokemonsByType(name: string) {
    this.pokeService.getPokemonByTypes(name).subscribe(
      data => {
        this.pokemons_types_aux = [...this.pokemons_types_aux, { 'type': name, 'list_pokemons': data['pokemon'].slice(0, 6), 'total': data['pokemon'].length }];
      },
      err => {
        console.log(err);
      },
      () => {
        this.pokemons_types = this.pokemons_types_aux;
      }
    );
  }
}
