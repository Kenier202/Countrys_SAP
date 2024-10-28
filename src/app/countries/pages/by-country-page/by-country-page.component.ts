import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit{

  public countries : Country[] = [];
  public initialValue: string = '';

  constructor(public CountriesService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.CountriesService.cacheStore.byName.countries;
    this.initialValue = this.CountriesService.cacheStore.byName.term;
  }
  searchByCountry(term: string){
    this.CountriesService.searchCountry(term).subscribe(countries => this.countries = countries);
  }
}
