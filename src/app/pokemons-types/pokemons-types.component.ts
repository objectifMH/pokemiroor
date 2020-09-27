import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemons-types',
  templateUrl: './pokemons-types.component.html',
  styleUrls: ['./pokemons-types.component.scss']
})
export class PokemonsTypesComponent implements OnInit {

  pokemons_types: any;
  pokemons_types_aux: any;
  type: string;
  nbr_scroll = 30;

  constructor(private pokeService: PokemonService, private route: ActivatedRoute, private router: Router, ) { }

  ngOnInit(): void {
     this.type = this.route.snapshot.paramMap.get('type');
    this.getAllPokemonsByType(this.type);
  }

  getAllPokemonsByType(type: string) {
    this.pokeService.getAllPokemonByTypes(type).subscribe(
      data => {
        this.pokemons_types_aux = data['pokemon'];
        this.pokemons_types = this.pokemons_types_aux.slice(0,30);
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

  @HostListener('window:scroll', ['$event'])
  onScroll($event: Event): void {
    //console.log("On Scroll");
    //Logic To Check whether we are bottom of the page
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log("On Scroll Down", this.nbr_scroll);
      //Write logic here for loading new content.
      if (this.nbr_scroll <= this.pokemons_types_aux.length) {
        this.pokemons_types = this.pokemons_types_aux.slice(0, this.nbr_scroll);
        this.nbr_scroll = this.nbr_scroll + 10;
        console.log(this.pokemons_types);
      }
      else {
        this.pokemons_types = this.pokemons_types_aux;
        console.log(this.pokemons_types);
      }
    }
  }

}
