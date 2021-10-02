import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['../_sass/invoice.scss']
})
export class InvoiceComponent implements OnInit {

  print;
  constructor(private router:Router, private activatedRoute:ActivatedRoute) {
    this.print = this.router.getCurrentNavigation().extras.state.print;
    }

  ngOnInit(): void {

    //working fine but need printer
      setTimeout(() => {
        window.print();
       
      }, 100,setTimeout(() => {
        this.router.navigateByUrl('main/dashboard')
      }, 500));
     
    // setTimeout(() => {
    //   this.router.navigateByUrl('main/dashboard')
    // }, 3000);
  }

}
