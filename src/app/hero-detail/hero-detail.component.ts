import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../core/models/hero.model';
import { HeroService } from '../core/services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  public hero!: Hero;

  constructor(
    private heroService: HeroService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  public getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  public goBack(): void {
    this.location.back()
  }
}
