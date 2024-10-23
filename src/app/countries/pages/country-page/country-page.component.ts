import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country: Country | null = null;
  constructor( private activatedRoute: ActivatedRoute,
    private CountriesService: CountriesService,
    private router: Router
  )
  { }

  ngOnInit(): void {

    // this.activatedRoute.params.subscribe( params => {
    //   this.CountriesService.searchCountryByAlplhaCode(params['id'])
    //   .subscribe(country => console.log(country));
    // });

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.CountriesService.searchCountryByAlplhaCode(id))
    ).subscribe(country => {
      if(!country){
        this.router.navigateByUrl('');
      }

      return this.country = country;
    });
  }

}
