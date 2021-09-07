import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pawner } from '../_model/pawner';

@Component({
  selector: 'app-newloan',
  templateUrl: './newloan.component.html'
})
export class NewloanComponent implements OnInit {

  pawner:Pawner = {} as Pawner;

  constructor(private activatedRoute: ActivatedRoute, private router:Router) {
    this.activatedRoute.queryParams.subscribe( params => {
      if(this.router.getCurrentNavigation().extras.state) {
        this.pawner = this.router.getCurrentNavigation().extras.state.pawner
      }
    })
    
   }

  ngOnInit(): void {
    if(this.pawner)
    console.log('new panwer: '+ JSON.stringify(this.pawner));
  }
  
}
