import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-list-pokemon-abilitie',
  templateUrl: './list-pokemon-abilitie.component.html',
  styleUrls: ['./list-pokemon-abilitie.component.scss']
})
export class ListPokemonAbilitieComponent implements OnInit {

  
  abilities: string[];
  pokemons_abilities = [];
  pokemons_abilities_aux = [];

  nbr_scroll = 2;

  constructor(private pokeService: PokemonService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getAbilitiesPokemon();
  }

  getAbilitiesPokemon() {
    this.pokeService.getAbilities().subscribe(
      data => {
        this.abilities = data['results'];
        console.log(this.abilities);
      },
      err => {
        console.log(err);
      },
      () => {
        this.abilities.map(ability => this.getPokemonsByAbility(ability['name']))
      }
    );
  }

  getPokemonsByAbility(name: string) {
    this.pokeService.getPokemonByAbility(name).subscribe(
      data => {
        this.pokemons_abilities_aux = [...this.pokemons_abilities_aux, { 'ability': name, 'list_pokemons': data['pokemon'].slice(0, 8) }];
      },
      err => {
        console.log(err);
      },
      () => {
        this.pokemons_abilities = this.pokemons_abilities_aux.slice(0, this.nbr_scroll);
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
      if (this.nbr_scroll <= this.pokemons_abilities_aux.length) {
        this.pokemons_abilities = this.pokemons_abilities_aux.slice(0, this.nbr_scroll);
        this.nbr_scroll = this.nbr_scroll + 0.1;
      }
    }
  }

  onAbility(pokemon) {
    this.pokemons_abilities = this.pokemons_abilities_aux;
    console.log(this.pokemons_abilities_aux);
  }


  redirectAbilityFragment(ability) {
    setTimeout(() => {
      this.router.navigate(['/ability'], { fragment: ability });
    }, 1500);
  }

}
