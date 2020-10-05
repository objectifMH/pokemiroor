import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  pokemons = [];

  constructor(private pokeService: PokemonService,
    private utilService: UtilService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllPokemon();
  }

  getAllPokemon() {
    this.pokeService.getPokemonsByPage("0", "20").subscribe(
      data => {
        this.pokemons = data['results'];
      },
      err => {
        console.log(err);
      },
      () => {
        console.log(this.pokemons);
      });
  }



}
