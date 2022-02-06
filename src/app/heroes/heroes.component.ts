import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  public getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }

  public onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}
