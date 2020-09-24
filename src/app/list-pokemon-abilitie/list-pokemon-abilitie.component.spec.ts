import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPokemonAbilitieComponent } from './list-pokemon-abilitie.component';

describe('ListPokemonAbilitieComponent', () => {
  let component: ListPokemonAbilitieComponent;
  let fixture: ComponentFixture<ListPokemonAbilitieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPokemonAbilitieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPokemonAbilitieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
