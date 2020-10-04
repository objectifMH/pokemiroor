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
  input_search = "";
  pokemons = [];
  search_pokemons = [];
  
  constructor(private fb: FormBuilder,  private router: Router, 
              private utilserv: UtilService,
              private pokeService: PokemonService) {
    this.monForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(){
    this.getAllPokemon();
  }

  onSubmit() {
    console.log(this.monForm.value);
  }

  toggleSearch() {
    this.isInputSearch = !this.isInputSearch;
    console.log(this.isInputSearch);
  }

  allClear() {
    this.monForm = this.fb.group({
      search: ['']
    });
    this.isShowSearch = false;
  }

  inputSearchChange() {
    let search = this.monForm.value.search;
    
    console.log(this.monForm.value, search);
    let search_length = search.length;

    if ( search_length >= 2)
    {
      this.isShowSearch = true;
      this.input_search = search;
      this.search_pokemons = this.pokemons.filter(pokemon => pokemon.name.slice(0, search_length) === search.slice(0, search_length));
    }
    else{
      this.search_pokemons = [];
    }
    console.log(this.search_pokemons);
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
        console.log(this.pokemons);
      });
  }
}
