import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Barangay } from '../_model/address/barangay';
import { City } from '../_model/address/city';
import { User } from '../_model/user';
import { AddressService } from '../_service/address.service';
import { CommonService } from '../_service/common.service';
import { EmployeeService } from '../_service/employee.service';
import { NotifierService } from '../_service/notifier.service';
import { PawnerService } from '../_service/pawner.service';

@Component({
  selector: 'app-pawner',
  templateUrl: './pawner.component.html',
  styleUrls: ['../_sass/settings_scss/pawner.scss'],
})
export class PawnerComponent implements OnInit {
  @ViewChild('firstNameRef', { static: true }) firstNameRef: ElementRef;
  pawnerForm: FormGroup;
  cities: City[] = [];
  barangays: Barangay[] = [];
  isSave: boolean = true;
  isCreate = false;
  employeeId: number;

  constructor(
    private pawnerService: PawnerService,
    private fb: FormBuilder,
    private router: Router,
    private addressService: AddressService,
    private notifierService: NotifierService,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private employeeService: EmployeeService
  ) {
    this.pawnerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', Validators.required],
      barangay: ['', Validators.required],
      completeAddress: ['', Validators.required],
      employeeId: [],
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.firstNameRef.nativeElement.focus();
    }, 100);

    /* check the parameters if this request came from settings create or transaction create pawner
    if from create pawner it will re direct to create newloan if not will stay to create pawner */
    this.activatedRoute.queryParams.subscribe((params) => {
      this.isCreate = params.isCreate;
    });

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
    this.router.navigateByUrl('main/dashboard');
  }

  reset() {
    this.pawnerForm.reset();
    this.firstNameRef.nativeElement.focus();
  }

  save() {
    this.employeeService.currentUser$.subscribe((emp) => {
      this.employeeId = emp.id;
    });

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
      employeeId: this.employeeId,
    };

    //convert pawnwer to save in database
    const pawner = {
      firstName: p.firstName,
      lastName: p.lastName,
      contactNumber: this.commonService.stringToNumber(p.contactNumber),
      addresses: [address],
      dateCreated: new Date().toISOString(),
      dateUpdated: null,
      employeeId: this.employeeId,
      isActive: true,
    };

    /*
    call service to add new panwer if add success redirect to newloan */
    this.pawnerService.addPawner(pawner).subscribe((newPawner) => {
      if (Object.keys(newPawner).length > 0) {
        this.notifierService.success(
          `New pawner added: ${newPawner.firstName} ${newPawner.lastName}`
        );
        if (!this.isCreate)
          this.router.navigateByUrl('main/transactions/newloan/', {
            state: { pawner: newPawner },
          });
        this.reset();
        return;
      }
    });
  }
}
