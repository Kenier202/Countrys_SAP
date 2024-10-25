import { catchError, delay, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiURL : string = 'https://restcountries.com/v3.1/';

  constructor(private http: HttpClient) { }


  private getCountriesRequest(url : string):
   Observable<Country[]> {
    return this.http.get<Country[]>(url)
    .pipe(catchError(error => of([])), delay(2000));
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
    return this.getCountriesRequest(url);
  }

  searchCountry ( term: string) : Observable<Country[]>{
    const url = `${this.apiURL}name/${term}`;
    return this.http.get<Country[]>(url).pipe( catchError(error => of([])) );
  }

  searchRegion (term : string) : Observable<Country[]>{
    const url = `${this.apiURL}region/${term}`;
    return this.http.get<Country[]>(url).pipe( catchError(error => of([])) );
  }

}
