import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pawner } from '../_model/pawner';
import * as _moment from 'moment';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-newloan',
  templateUrl: './newloan.component.html'
})
export class NewloanComponent implements OnInit {

  pawner:Pawner = {} as Pawner;
  formDates:FormGroup;
  today =  Date.now()

  constructor(private activatedRoute: ActivatedRoute, private router:Router, 
    private fb:FormBuilder,
    private datePipe: DatePipe
    ) {
    
    const moment = _moment;
    
    const today = Date.now();
    
    this.activatedRoute.queryParams.subscribe( params => {
      if(this.router.getCurrentNavigation().extras.state) {
        this.pawner = this.router.getCurrentNavigation().extras.state.pawner
      }
    });

    this.formDates =  fb.group({
      dateTransaction: []
    });
    
   }

  ngOnInit(): void {
    if(this.pawner)
    console.log('new panwer: '+ JSON.stringify(this.pawner));
    console.log(this.datePipe.transform(this.today, "yyyy-MM-dd"));
    
  }
  
}
