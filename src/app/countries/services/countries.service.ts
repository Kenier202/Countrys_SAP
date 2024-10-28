import { catchError,  map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';
import { tick } from '@angular/core/testing';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiURL : string = 'https://restcountries.com/v3.1/';

  public cacheStore: CacheStore= {
    byCapital: {term: '', countries: []},
    byName: {term: '', countries: []},
    byRegion: {region: '', countries: []}
  };


  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
   }

  private saveToLocalStorage (){
    localStorage.setItem('cacheStore',JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage (){
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url : string):
   Observable<Country[]> {
    return this.http.get<Country[]>(url)
    .pipe(catchError(error => of([])));
    ;
   }

  searchCountryByAlplhaCode (code: string ) : Observable<Country | null>
  {
    return this.http.get<Country[]>(`${this.apiURL}alpha/${code}`)
    .pipe(
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError(error => of(null)));
  }

  searchCapital( term: string ): Observable<Country[]> {
    const url = `${this.apiURL}capital/${term}`;
    console.log(this.cacheStore.byCapital);

    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byCapital = {term,countries}),
      tap( () => this.saveToLocalStorage() ),
    );
    ;
  }

  searchCountry ( term: string) : Observable<Country[]>{
    const url = `${this.apiURL}name/${term}`;
    return this.http.get<Country[]>(url).pipe( catchError(error => of([])) )
    .pipe(tap(countries=> this.cacheStore.byName = {term,countries} ),

    tap( () => this.saveToLocalStorage() ),
  )
    ;
  }

  searchRegion (region : Region) : Observable<Country[]>{
    const url = `${this.apiURL}region/${region}`;
    return this.http.get<Country[]>(url).pipe( catchError(error => of([])) )
    .pipe(
      tap(countries=> this.cacheStore.byRegion = { region,countries} ),

      tap( () => this.saveToLocalStorage() ),
    )

    ;
  }

}
