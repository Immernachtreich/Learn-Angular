import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

import { Hero } from '../interfaces/hero';

import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes'; // URL to web api 

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private messageService: MessagesService,
    private http: HttpClient
  ) { }

  // getHeroes is of type Observable and Observable is of type any but we initialize it with type Hero[]
  // of keyword is used for completing the observable request as it is synchronous.
  getHeroes(): Observable<Hero[]> {

    const heroes = this
      .http
      .get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(() => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes'))
      );

    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const url = this.heroesUrl + '/' + id;
    const hero = this
      .http
      .get<Hero>(url)
      .pipe(
        tap(() => this.log('fetched hero')),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      )
    
    return hero;
  }

  updateHero(hero: Hero): Observable<any> {
    return this
      .http
      .put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(() => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this
      .http
      .post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => {
          this.log(`added hero w/ id=${newHero.id}`)
        }),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  deleteHero(hero: Hero): Observable<any> {
    const url = this.heroesUrl + '/' + hero.id;
    return this
      .http
      .delete(url, this.httpOptions)
      .pipe(
        tap(() => this.log(`deleted hero id=${hero.id}`)),
        catchError(this.handleError<any>('deleteHero'))
      );
  }

  searchHero(term: string): Observable<Hero[]> {
    if(!term.trim()) return of([]);

    return this 
      .http
      .get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(x => {
          x.length ?
            this.log(`found heroes matching "${term}"`) :
            this.log(`no heroes matching "${term}"`);
        })
      );
  }

  // Used for logging the messages in the messae box by HeroService tag.
  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */

  private handleError<T>(operation: string = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send error to remote logging infrastructure
      console.error(error);

      // TODO: Properly log the error for user to understand
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}
