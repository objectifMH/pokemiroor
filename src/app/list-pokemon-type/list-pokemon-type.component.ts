import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-list-pokemon-type',
  templateUrl: './list-pokemon-type.component.html',
  styleUrls: ['./list-pokemon-type.component.scss']
})
export class ListPokemonTypeComponent implements OnInit {

  types: string[];
  pokemons_types = [];

  constructor(private pokeService: PokemonService) { }

  ngOnInit(): void {
    this.getTypesPokemon();
  }

  getTypesPokemon() {
    this.pokeService.getTypes().subscribe(
      data => {
        this.types = data['results'];
        console.log(this.types);
      },
      err => {
        console.log(err);
      },
      () => {
        this.types.map( type => this.getPokemonsByType(type['name']))
      }
    );
  }

  getPokemonsByType(name: string) {
    this.pokeService.getPokemonByTypes(name).subscribe(
      data => {
        this.pokemons_types = [...this.pokemons_types, {'type': name, 'list_pokemons': data['pokemon'].slice(0,8)}];
        console.log(this.pokemons_types);

      },
      err => {
        console.log(err);
      },
      () => {
        //this.pokemons_types.sort() = this.pokemons_types;
       }
    );
  }


}
