import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pawner } from '../_model/pawner';

@Component({
  selector: 'app-newloan',
  templateUrl: './newloan.component.html',

})
export class NewloanComponent implements OnInit {

  pawner: Pawner = {} as Pawner;
  formDates: FormGroup;
  today = new Date();
  dateMature =  new Date( new Date().setMonth( new Date().getMonth() + 1));
  dateExpire = new Date( new Date().setMonth( new Date().getMonth() + 4))
  
constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pawner = this.router.getCurrentNavigation().extras.state.pawner
      }
    });

    this.formDates = fb.group({
      dateTransaction: [ this.today],
      dateMature:[ this.dateMature],
      dateExpired:[this.dateExpire ]
    });

  }

  ngOnInit(): void {

    if (this.pawner)
      console.log('new panwer: ' + JSON.stringify(this.pawner));
    
  }

}
