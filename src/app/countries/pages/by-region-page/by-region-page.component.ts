import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions : Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: string;
  public initialValue: string = '';

  constructor(public CountriesService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.CountriesService.cacheStore.byRegion.countries;
    this.initialValue = this.CountriesService.cacheStore.byRegion.region;
  }

  searchByRegion(region: Region){
    this.selectedRegion = region;

    this.CountriesService.searchRegion(region).subscribe(countries => this.countries = countries);
  }

}
