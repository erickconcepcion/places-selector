import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceSearchComponent } from './place-search/place-search.component';
import { HttpClientModule } from '@angular/common/http';
import { PlaceListComponent } from './place-list/place-list.component';

@NgModule({
  declarations: [		
    AppComponent,
      PlaceSearchComponent,
      PlaceListComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
