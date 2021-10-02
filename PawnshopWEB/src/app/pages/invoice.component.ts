import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: [
  ]
})
export class InvoiceComponent implements OnInit, AfterViewInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
      setTimeout(() => {
        window.print();
       
      }, 100,setTimeout(() => {
        this.router.navigateByUrl('dashboard')
      }, 500));
      
    
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
 
  }

}
