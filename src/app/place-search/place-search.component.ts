import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-place-search',
  templateUrl: './place-search.component.html',
  styleUrls: ['./place-search.component.scss']
})
export class PlaceSearchComponent implements OnInit, OnDestroy {
  @Input()
  label: string = '';
  @Input()
  placeholder: string = '';
  @Input() initialValue: string = '';
  @Input() debounceTime = 300;

  @Output() textChange = new EventEmitter<string>();
  @Output() leave = new EventEmitter();

  inputValue = new Subject<string>();
  trigger = this.inputValue.pipe(
    debounceTime(this.debounceTime)
    //distinctUntilChanged()
  );

  subscriptions: Subscription[] = [];

  constructor() {}

  ngOnInit() {
    const subscription = this.trigger.subscribe((currentValue) => {
      this.textChange.emit(currentValue);
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onInput(e: any) {
    this.inputValue.next(e.target.value);
  }

  onBlur(e: any) {
    this.leave.emit();
  }
}
