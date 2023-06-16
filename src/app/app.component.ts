import 'zone.js/dist/zone';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { PlaceSearchComponent } from './place-search/place-search.component';
import { PlaceService } from './place.service';
import {
  catchError,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { Place } from './place';
declare let google: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private placeService: PlaceService
  ) {}
  name = 'Angular';
  ngOnInit(): void {
    this.results$.subscribe((p) => {
      console.log('after subscribe ', p,'-------', new Date().toTimeString());
    });
  }

  ngOnDestroy(): void {
    this.destroyer.next(0);
    this.destroyer.complete();
    this.searchTerm.complete();
  }

  destroyer = new Subject();

  searchTerm = new Subject<string>();
  results$: Observable<Place[]> = this.searchTerm.pipe(
    tap((p) =>
      console.log('before service', p, '-------', new Date().toTimeString())
    ),
    switchMap((searchTerm) => this.placeService.GetPlace(searchTerm)),
    tap((p) =>
      console.log('after service', p, '-------', new Date().toTimeString())
    ),
    map((r) => (r.status === 'OK' ? r.results : ([] as Place[]))),
    catchError((errorResponse) => {
      alert('para utilizar este servicio es necesaria la conexion a internet.');
      console.error(errorResponse);
      return of([] as Place[]);
    }),
    tap((p) =>
      console.log('after catch', p, '-------', new Date().toTimeString())
    )
  );

  onTextChange(changedText: string) {
    this.searchTerm.next(changedText);
  }
}