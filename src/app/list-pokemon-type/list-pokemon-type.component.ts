import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-list-pokemon-type',
  templateUrl: './list-pokemon-type.component.html',
  styleUrls: ['./list-pokemon-type.component.scss']
})
export class ListPokemonTypeComponent implements OnInit {

  types: string[];
  pokemons_types = [];
  pokemons_types_aux = [];

  nbr_scroll = 2;

  constructor(private pokeService: PokemonService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getTypesPokemon();
  }

  getTypesPokemon() {
    this.pokeService.getTypes().subscribe(
      data => {
        this.types = data['results'];
        this.types.sort();
        console.log(this.types);
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
        this.pokemons_types_aux = [...this.pokemons_types_aux, { 'type': name, 'list_pokemons': data['pokemon'].slice(0, 8) }];
      },
      err => {
        console.log(err);
      },
      () => {
        this.pokemons_types = this.pokemons_types_aux.slice(0, this.nbr_scroll);
        //console.log(this.pokemons_types);
      }
    );
  }

  

  @HostListener('window:scroll', ['$event'])
  onScroll($event: Event): void {
    //console.log("On Scroll");
    //Logic To Check whether we are bottom of the page
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      //console.log("On Scroll Down", this.nbr_scroll);
      //Write logic here for loading new content.
      if (this.nbr_scroll <= this.pokemons_types_aux.length) {
        this.pokemons_types = this.pokemons_types_aux.slice(0, this.nbr_scroll);
        this.nbr_scroll = this.nbr_scroll + 0.1;
      }
    }
  }

  onType(pokemon) {
    this.pokemons_types = this.pokemons_types_aux;
    console.log(this.pokemons_types_aux);
  }


  redirectTypeFragment(type) {
    setTimeout(() => {
      this.router.navigate(['/types'], { fragment: type });
    }, 1500);
  }

}
