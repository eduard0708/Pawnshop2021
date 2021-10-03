import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  
} from '@angular/forms';

@Component({
  selector: 'app-pawner-info',
  templateUrl: './pawner-info.component.html',
  styleUrls:['../_sass/components.scss']
})
export class PawnerInfoComponent implements OnInit {
  @Input() pawnerInfo;
  @Output() dateTransactionEvent = new EventEmitter<Date>();

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {

  }
}
