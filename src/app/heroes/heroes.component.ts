import { Component } from '@angular/core';
import { Hero } from '../hero.model';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent {
  public hero: Hero = { id: 1, name: 'Wolverine' };

  public heroes = HEROES;
  public selectedHero?: Hero;

  public onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}
