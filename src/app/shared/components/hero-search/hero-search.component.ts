import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, filter, Observable, Subject, switchMap } from 'rxjs';
import { Hero } from './../../../core/models/hero.model';
import { HeroService } from './../../../core/services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
})
export class HeroSearchComponent implements OnInit {
  public heroes$!: Observable<Hero[]>;
  @Input() public label = '';
  @Output() private selected = new EventEmitter<Hero>();

  private searchTerm = new Subject<string>();

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroes$ = this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((valorDigitado) => valorDigitado.length >= 3 || !valorDigitado.length),
      switchMap(term => this.heroService.search(term))
    )
  }

  public onSelected(selectedHero: MatAutocompleteSelectedEvent): void {
    this.searchTerm.next('');
    const hero: Hero = selectedHero.option.value;
    this.selected.emit(hero);
  }

  public search(term: string): void {
    this.searchTerm.next(term);
  }
}
