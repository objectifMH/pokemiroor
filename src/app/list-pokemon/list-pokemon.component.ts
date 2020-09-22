import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit {

  pokemons: any;
  show_abilities: boolean = false;

  constructor(private pokeService: PokemonService) { }

  ngOnInit(): void {
    this.getAllPokemons();
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getAllPokemons() {
    this.pokeService.getPokemonsByPage(this.getRandomInt(200).toString(), "12").subscribe(
      data => {
        this.pokemons = data['results'];
        console.log(this.pokemons);
      },
      err => {
        console.log(err);
      },
      () => {
        this.show_abilities = true;
        this.pokemons.map(poke => {
          let random_5 = this.getRandomInt(9);
          if (poke.name === "mew") {
            poke.show = true;
          }
          else {
            poke.show = random_5 === 4 ? true : false;
            if (poke.show === false) {
              poke.width = 100;
              poke.height = 100;
            }
          }
        })
      }
    );
  }

}
