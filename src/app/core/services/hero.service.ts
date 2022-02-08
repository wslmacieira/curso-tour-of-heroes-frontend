import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Hero } from '../models/hero.model';
import { environment } from './../../../environments/environment';
import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  private heroesUrl = `${environment.baseUrl}/heroes`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  public getAll(): Observable<Hero[]> {
    if (environment.production) {
      this.messageService.add('HeroService: fetched heroes');
      return of(HEROES);
    } else {
      return this.http
        .get<Hero[]>(this.heroesUrl)
        .pipe(tap((heroes) => this.log(`fetched ${heroes.length} hero(es)`)));
    }
  }

  public getOne(id: number): Observable<Hero> {
    if (environment.production) {
      const hero = HEROES.find(hero => hero.id === id)!;
      this.messageService.add(`HeroService: fetched hero id=${id}`)
      return of(hero);
    } else {
      return this.http
        .get<Hero>(`${this.heroesUrl}/${id}`)
        .pipe(
          tap((hero) => this.log(`fetched ${this.descHeroAttributes(hero)}`))
        );
    }
  }

  public create(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero).pipe(
      tap((hero) => this.log(`created ${this.descHeroAttributes(hero)}`))
    );
  }

  public update(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.heroesUrl}/${hero.id}`, hero).pipe(
      tap((hero) => this.log(`updated ${this.descHeroAttributes(hero)}`))
    );
  }

  private descHeroAttributes(hero: Hero): string {
    return `hero id=${hero.id} and name=${hero.name}`;
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }
}
