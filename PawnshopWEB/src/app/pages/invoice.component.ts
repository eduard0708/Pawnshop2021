import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionInformation } from '../_model/transaction/transaction-information';
import { NotifierService } from '../_service/notifier.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['../_sass/invoice.scss'],
})
export class InvoiceComponent implements OnInit {
  print:TransactionInformation;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private notifier:NotifierService
    ) {
    this.print = this.router.getCurrentNavigation().extras.state.print;
  }

  ngOnInit(): void {
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
