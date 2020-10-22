import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { PokemonService } from './services/pokemon.service';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokemirroor';

  faLinkedinIn = faLinkedinIn;
  faGithub = faGithub;
  faUserCircle = faUserCircle;

  monForm: FormGroup;
  isInputSearch = false;
  isShowSearch = false;
  isShowMenu = true;
  input_search = "";
  pokemons = [];
  search_pokemons = [];
  search_pokemons_aux = [];

  search_begin;
  search_end;
  myPokedex;
  nbrMyPokedex = 0;

  constructor(private fb: FormBuilder, private router: Router,
    private utilserv: UtilService,
    private pokeService: PokemonService) {
    this.monForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit() {
    this.getAllPokemon();
  }

  ngDoCheck() {
    this.getMyPokedex();
  }

  onSubmit() {
    console.log(this.monForm.value);
  }

  toggleSearch() {
    this.isInputSearch = !this.isInputSearch;
  }

  allClear() {
    this.monForm = this.fb.group({
      search: ['']
    });
    this.isShowSearch = false;
  }

  clear() {
    this.monForm = this.fb.group({
      search: ['']
    });
  }

  inputSearchChange() {
    let search = this.monForm.value.search;
    let search_length = search.length;
    this.input_search = search;

    if (search_length > 0) {
      this.isShowSearch = true;
      this.search_pokemons_aux = this.pokemons.filter(pokemon =>
        (pokemon.name.toLowerCase()).includes(search.toLowerCase())
        ||
        (pokemon['url'].split("/")[6]).includes(search.toLowerCase())
      );


      if (this.search_pokemons_aux && this.search_pokemons_aux.length <= 10) {
        this.search_begin = 0;
        this.search_end = this.search_pokemons_aux.length;
        this.search_pokemons = this.search_pokemons_aux.slice(0, this.search_pokemons_aux.length);
        console.log("laliste est vide mais je suis aussi dans ce if");
      }
      else {
        this.search_begin = 0;
        this.search_end = 10;
        this.search_pokemons = this.search_pokemons_aux.slice(this.search_begin, 10);
        console.log("laliste est vide mais je passe aussi dans ce else  ");
      }
    }
    else {
      console.log("laliste est vide");
      this.search_pokemons = [];
      this.search_begin = 0;
      this.search_end = 0;
      this.search_pokemons_aux = [];
    }
   
  }

  getSearchBegin() {
    if (this.search_begin - 10 >= 0) {
      this.search_begin -= 10;
      this.search_end = this.search_begin + 10;
      this.search_pokemons = this.search_pokemons_aux.slice(this.search_begin, this.search_end);
    }
  }

  getSearchEnd() {
    if (this.search_end + 10 <= this.search_pokemons_aux.length) {
      this.search_begin += 10;
      this.search_end += 10;
      this.search_pokemons = this.search_pokemons_aux.slice(this.search_begin, this.search_end);
    }
    else {
      if (this.search_end + 10 > this.search_pokemons_aux.length) {
        this.search_begin += 10;
        this.search_end = this.search_pokemons_aux.length;
        this.search_pokemons = this.search_pokemons_aux.slice(this.search_begin, this.search_pokemons_aux.length);
      }
    }
  }

  getAllPokemon() {
    this.pokeService.getPokemonsByPage("0", "2000").subscribe(
      data => {
        this.pokemons = data['results'];
      },
      err => {
        console.log(err);
      },
      () => {
      });
  }

  // Menu mobile 
  toggleMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

  getMyPokedex() {
    this.pokeService.getMyPokedex().subscribe(
      data => {
        this.myPokedex = data;
        this.nbrMyPokedex = this.myPokedex.length;
      },
      err => {
        console.log(err);
      }
    );
  }
}
