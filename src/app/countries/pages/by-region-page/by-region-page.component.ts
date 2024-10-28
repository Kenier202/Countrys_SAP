import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public countries: Country[] = [];
  public regions :string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: string;

  constructor(public CountriesService: CountriesService){}

  searchByRegion(term: string){
    this.selectedRegion = term;

    this.CountriesService.searchRegion(term).subscribe(countries => this.countries = countries);
  }

}
