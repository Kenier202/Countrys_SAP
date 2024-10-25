
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
  ],
  exports:[
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
