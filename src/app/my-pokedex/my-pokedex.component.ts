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

  isSortDownId: boolean;
  isSortDownName: boolean;
  isSortDownPrix: boolean;

  constructor(private poke: PokemonService, private utilService: UtilService) { }

  ngOnInit(): void {
    this.getMyPokedex();
  }

  getMyPokedex() {
    this.poke.getMyPokedex().subscribe(
      data => {
        this.pokemons = data;
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

  clearAll() {
    this.poke.setMyPokedex([]);
  }

  sortId() {
    
    if( !this.isSortDownId)
    {
      this.pokemons = this.sortAsc(this.pokemons, 'id');
    }
    else {
      this.pokemons = this.sortDesc(this.pokemons, 'id');
    }
    this.isSortDownId = !this.isSortDownId;
  }

  sortName() {

    if( !this.isSortDownName)
    {
      this.pokemons = this.utilService.sortAsc(this.pokemons, 'name');
    }
    else {
      this.pokemons = this.utilService.sortDesc(this.pokemons, 'name');
    }
    this.isSortDownName = !this.isSortDownName;
  }

  sortPrix() {

    if( !this.isSortDownPrix)
    {
      this.pokemons = this.utilService.sortAsc(this.pokemons, 'prix');
    }
    else {
      this.pokemons = this.utilService.sortDesc(this.pokemons, 'prix');
    }
    this.isSortDownPrix = !this.isSortDownPrix;
  }
}
