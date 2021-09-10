import { Component, OnInit } from '@angular/core';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-additional',
  templateUrl: './additional.component.html'
})
export class AdditionalComponent implements OnInit {

  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    prefix: '$ ',
    placeholder: '0',
  });
  

  constructor() { }

  ngOnInit(): void {
  }

}
