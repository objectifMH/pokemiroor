import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit {

  pokemons: any;

  constructor(private pokeService: PokemonService) { }

  ngOnInit(): void {
    this.getAllPokemons();
  }

  getAllPokemons(){
    this.pokeService.getPokemonsByPage("150","12").subscribe(
      data => {
         this.pokemons = data['results'];
         console.log(this.pokemons);
         },
      err => {
        console.log(err);
      });
  }

}
