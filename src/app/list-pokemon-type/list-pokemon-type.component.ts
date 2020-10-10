import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-list-pokemon-type',
  templateUrl: './list-pokemon-type.component.html',
  styleUrls: ['./list-pokemon-type.component.scss']
})
export class ListPokemonTypeComponent implements OnInit {

  types: string[];
  pokemons_types = [];
  pokemons_types_aux = [];

  constructor(private pokeService: PokemonService, private utilService: UtilService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getTypesPokemon();
  }

  ngOnChanges() {
   this.types =  this.utilService.sortAsc(this.types, 'name');
  }

  getTypesPokemon() {
    this.pokeService.getTypes().subscribe(
      data => {
        this.types = data['results'];
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
        this.pokemons_types_aux = this.utilService.sortAsc(this.pokemons_types_aux, 'type');
        this.pokemons_types = this.pokemons_types_aux;
      }
    );
  }
}
