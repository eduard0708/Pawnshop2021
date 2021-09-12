import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-pawner-info',
  templateUrl: './pawner-info.component.html'
})

export class PawnerInfoComponent implements OnInit  {
  @Input() pawnerInfo;

  constructor() { }

  ngOnInit(): void {

}
  
}
