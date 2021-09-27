import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotifierComponent } from '../_dialogs/notifier/notifier.component';
import { Barangay } from '../_model/barangay';
import { City } from '../_model/city';
import { AddressService } from '../_service/address.service';
import { DialogsService } from '../_service/dialogs.service';
import { NotifierService } from '../_service/notifier.service';
import { PawnerService } from '../_service/pawner.service';

@Component({
  selector: 'app-pawner',
  templateUrl: './pawner.component.html',
  styleUrls: ['_settings.sass/pawner.scss'],
})
export class PawnerComponent implements OnInit {
  @ViewChild('firstNameRef', { static: true }) firstNameRef: ElementRef;
  pawnerForm: FormGroup;
  cities: City[] = [];
  barangays: Barangay[] = [];
  isSave: boolean = true;
  d: Date;

  constructor(
    private pawnerService: PawnerService,
    private fb: FormBuilder,
    private router: Router,
    private dialogService: DialogsService,
    private addressService: AddressService,
    private notifierService: NotifierService,
    private notifier: MatSnackBar
  ) {
    this.pawnerForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', Validators.required],
      barangay: ['', Validators.required],
      completeAddress: ['', Validators.required],
    });
  }

  serializedDate = new FormControl();

  ngOnInit(): void {
    this.notifierService.error('ONerdfasdf fasdfdf afasdf', '');

    setTimeout(() => {
      this.firstNameRef.nativeElement.focus();
    }, 100);

    this.pawnerForm.valueChanges.subscribe(() => {
      this.isSave = !this.pawnerForm.valid;
    });

    this.addressService.getCitiesWithBarangays().subscribe((city) => {
      this.cities = city as any;
    });
  }

  onSelectCity() {
    const cityId = +this.pawnerForm.controls.city.value;
    let city: City = this.cities.find((o) => o.cityId === cityId);
    if (city) this.barangays = city.barangays;
  }

  cancel() {
    this.router.navigateByUrl('/dashboard');
  }

  reset() {
    this.pawnerForm.reset();
    this.firstNameRef.nativeElement.focus();
  }

  save() {
    const empId = JSON.parse(localStorage.getItem('user'));
    const p = this.pawnerForm.value;
    const city: City = this.cities.find((c) => c.cityId === +p.city);

    //convert address to addresses
    const address = {
      cityName: city.cityName,
      barangayName: p.barangay,
      completeAddress: p.completeAddress,
      dateCreated: new Date().toISOString(),
      dateUpdated: null,
      isActive: true,
      employeeId: empId.id,
    };

    //convert pawnwer to save in database
    const pawner = {
      firstName: p.firstName,
      lastName: p.lastName,
      contactNumber: +p.contactNumber,
      addresses: [address],
      dateCreated: new Date().toISOString(),
      dateUpdated: null,
      employeeId: empId.id,
      isActive: true,
    };

    //call service to add new panwer if add success redirect to newloan
    this.pawnerService.addPawner(pawner).subscribe((newPawner) => {
      if (Object.keys(newPawner).length > 0)
        this.router.navigateByUrl('transactions/newloan/', {
          state: { pawner: newPawner },
        });
    });
  }
}
