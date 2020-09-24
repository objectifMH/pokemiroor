import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsAbilitiesComponent } from './pokemons-abilities.component';

describe('PokemonsAbilitiesComponent', () => {
  let component: PokemonsAbilitiesComponent;
  let fixture: ComponentFixture<PokemonsAbilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonsAbilitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonsAbilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
