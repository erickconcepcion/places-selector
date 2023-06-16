import { Component, Input, OnInit, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Place } from '../place';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceListComponent implements OnInit, OnChanges {

  @Input() places: Place[] | null = [];
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    console.log('places changes', this.places, '-------', new Date().toTimeString());
  }


}
