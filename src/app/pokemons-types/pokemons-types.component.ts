import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemons-types',
  templateUrl: './pokemons-types.component.html',
  styleUrls: ['./pokemons-types.component.scss']
})
export class PokemonsTypesComponent implements OnInit {

  pokemons_types: any;
  type: string;

  constructor(private pokeService: PokemonService, private route: ActivatedRoute, private router: Router, ) { }

  ngOnInit(): void {
     this.type = this.route.snapshot.paramMap.get('type');
    this.getAllPokemonsByType(this.type);
  }

  getAllPokemonsByType(type: string) {
    this.pokeService.getAllPokemonByTypes(type).subscribe(
      data => {
        this.pokemons_types = data['pokemon'];
        console.log(this.pokemons_types);
      },
      err => {
        console.log(err);
      },
      () => {
        // this.pokemons_types = this.pokemons_types_aux.slice(0, this.nbr_scroll);
        // console.log(this.pokemons_types);
      }
    );
  }

}
