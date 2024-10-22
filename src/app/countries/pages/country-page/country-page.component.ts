import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  constructor( private activatedRoute: ActivatedRoute, private CountriesService: CountriesService) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.CountriesService.searchCountryByAlplhaCode(params['id'])
      .subscribe(country => console.log(country));
    });
  }

}
