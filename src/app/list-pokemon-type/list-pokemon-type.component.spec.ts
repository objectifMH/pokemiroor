import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPokemonTypeComponent } from './list-pokemon-type.component';

describe('ListPokemonTypeComponent', () => {
  let component: ListPokemonTypeComponent;
  let fixture: ComponentFixture<ListPokemonTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPokemonTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPokemonTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
