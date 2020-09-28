import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemons-abilities',
  templateUrl: './pokemons-abilities.component.html',
  styleUrls: ['./pokemons-abilities.component.scss']
})
export class PokemonsAbilitiesComponent implements OnInit {

  pokemons_abilities: any;
  pokemons_abilities_aux: any;
  ability: string;
  nbr_scroll = 20;

  constructor(private pokeService: PokemonService, private route: ActivatedRoute, private router: Router, ) {
    let url ="";
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const url_val = val.url;

        url = ''.concat(this.pokeService.url_base+url_val);
        this.ngOnInit();
      }
    });
   }

  ngOnInit(): void {
     this.ability = this.route.snapshot.paramMap.get('ability');
    this.getAllPokemonsByAbility(this.ability);
  }

  getAllPokemonsByAbility(ability: string) {
    this.pokeService.getAllPokemonByAbilities(ability).subscribe(
      data => {
        this.pokemons_abilities_aux = data['pokemon'];
      },
      err => {
        console.log(err);
      },
      () => {
        this.pokemons_abilities = this.pokemons_abilities_aux.slice(0, 30);
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
        this.nbr_scroll = this.nbr_scroll + 10;
      }
    }
  }
}
