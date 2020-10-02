import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit {

  pokemons: any;
  show_abilities: boolean = false;

  constructor(private pokeService: PokemonService, private utilService: UtilService) { }

  ngOnInit(): void {
    this.getAllPokemons();
  }

  getAllPokemons() {
    this.pokeService.getPokemonsByPage(this.utilService.getRandomInt(200).toString(), "12").subscribe(
      data => {
        this.pokemons = data['results'];
      },
      err => {
        console.log(err);
      },
      () => {
        this.show_abilities = true;
        this.pokemons.map(poke => {
          let random_ = this.utilService.getRandomInt(9);
          if (poke.name === "mew") {
            poke.show = true;
          }
          else {
            poke.show = random_ === 4 ? true : false;
            if (poke.show === false) {
              poke.width = 110;
              poke.height = 110;
            }
          }
        })
      }
    );
  }
}
