import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-my-pokedex',
  templateUrl: './my-pokedex.component.html',
  styleUrls: ['./my-pokedex.component.scss']
})
export class MyPokedexComponent implements OnInit {

  pokemons: any;
  total: number;
  species: Object;

  constructor(private poke: PokemonService, private utilService: UtilService) { }

  ngOnInit(): void {
    this.getMyPokedex();
  }

  getMyPokedex() {
    this.poke.getMyPokedex().subscribe(
      data => {
        this.pokemons = data;
        console.log(this.pokemons);
        this.getTotal();
      },
      err => {
        console.log(err);
      }
    );
  }

  getTotal() {
    this.total = (this.pokemons.reduce((acc, pokemon) => acc + parseFloat(pokemon.prix), 0)).toFixed(2);
  }
 
  toggleAddDelete(pokemon) {
    console.log(pokemon);
    let tab = this.pokemons.filter(poke => poke.id !== pokemon.id);
    this.poke.setMyPokedex(tab);
  }


}
