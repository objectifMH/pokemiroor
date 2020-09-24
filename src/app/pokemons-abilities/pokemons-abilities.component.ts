import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemons-abilities',
  templateUrl: './pokemons-abilities.component.html',
  styleUrls: ['./pokemons-abilities.component.scss']
})
export class PokemonsAbilitiesComponent implements OnInit {

  pokemons_abilities: any;
  ability: string;

  constructor(private pokeService: PokemonService, private route: ActivatedRoute, private router: Router, ) { }

  ngOnInit(): void {
     this.ability = this.route.snapshot.paramMap.get('ability');
    this.getAllPokemonsByAbility(this.ability);
  }

  getAllPokemonsByAbility(ability: string) {
    this.pokeService.getAllPokemonByAbilities(ability).subscribe(
      data => {
        this.pokemons_abilities = data['pokemon'];
        console.log(this.pokemons_abilities);
      },
      err => {
        console.log(err);
      },
      () => {
      }
    );
  }

}
