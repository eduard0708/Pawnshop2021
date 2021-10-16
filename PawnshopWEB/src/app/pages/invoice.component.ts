import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from '../_service/notifier.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['../_sass/invoice.scss'],
})
export class InvoiceComponent implements OnInit {
  print;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private notifier:NotifierService
    ) {
    this.print = this.router.getCurrentNavigation().extras.state.print;

  }

  ngOnInit(): void {
    console.log(this.print);

    // this.notifier.success('New Loan Saved')
    //working fine but need printer
    // setTimeout(
    //   () => {
    //     window.print();
    //   },
    //   100,
    //   setTimeout(() => {
    //     this.router.navigateByUrl('main/dashboard');
    //   }, 500)
    // );

    setTimeout(() => {
      this.router.navigateByUrl('main/dashboard')
    }, 1000);
  }
}
