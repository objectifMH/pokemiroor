import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsTypesComponent } from './pokemons-types.component';

describe('PokemonsTypesComponent', () => {
  let component: PokemonsTypesComponent;
  let fixture: ComponentFixture<PokemonsTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonsTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
