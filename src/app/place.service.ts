import {} from "@angular/google-maps";
import { Inject, Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { appConfigs } from './configuration';
import { Place, PlaceResult } from './place';
import { map, tap } from 'rxjs/operators';
import { of, bindCallback } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  service: google.maps.places.PlacesService;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private ngZone: NgZone
  ) {
      this.service = new google.maps.places.PlacesService(
        this.document.createElement('div')
      );
    
  }
  private placesUri =
    'https://maps.googleapis.com/maps/api/place/textsearch/json';
  private config = appConfigs.mapConfiguration;
  private location = `${this.config.initialLat},${this.config.initialLong}`;
  private radius = 243525.6;
  public GetPlace2(text: string): Observable<PlaceResult> {
    return text !== ''
      ? this.http.get<PlaceResult>(
          `${this.placesUri}?query=${text}&location=${this.location}&radius=${this.radius}&key=${this.config.apiKey}`
        )
      : this.emptyRequest();
  }
  private emptyRequest(): Observable<PlaceResult> {
    return of(this.emptyResult());
  }
  private emptyResult(): PlaceResult {
    return {
      html_attributions: [],
      results: [],
      status: 'INVALID_REQUEST',
    } as PlaceResult;
  }

  GetPlace(query: string): Observable<PlaceResult> {
    if (query === '') {
      return this.emptyRequest();
    }

    const request: google.maps.places.TextSearchRequest = {
      query: query,
      location:{ lat: this.config.initialLat, lng: this.config.initialLong },
      radius: this.radius,
    };

    return new Observable<PlaceResult>((observer) => {
      const callback = (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        this.ngZone.run(() => {
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            observer.next(this.emptyResult());
          } else {
            observer.next({
              results:
                results?.map(
                  (r) =>
                    <Place>{
                      formatted_address: r.formatted_address,
                      geometry: {
                        location: {
                          lat: r?.geometry?.location?.lat(),
                          lng: r?.geometry?.location?.lng(),
                        },
                      },
                      icon: r.icon,
                      name: r.name,
                      place_id: r.place_id,
                      types: r.types,
                    }
                ) ?? [],
              status: status,
            });
          }
  
          observer.complete();
        })
      };


      this.service.textSearch(request, callback);
    });
  }
}
