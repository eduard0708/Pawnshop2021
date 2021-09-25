import { state } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Select } from '../_model/select';
import { DialogsService } from '../_service/dialogs.service';
import { PawnerService } from '../_service/pawner.service';

@Component({
  selector: 'app-pawner',
  templateUrl: './pawner.component.html',
  styleUrls: ['_settings.sass/pawner.scss'],
})
export class PawnerComponent implements OnInit {
  @ViewChild('firstNameRef', { static: true }) firstNameRef: ElementRef;
  pawnerForm: FormGroup;
  cities: Select[] = [];
  barangays: Select[] = [];
  isSave: boolean = true;
  d: Date;

  constructor(
    private pawnerService: PawnerService,
    private fb: FormBuilder,
    private router: Router,
    private dialogService: DialogsService
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
    setTimeout(() => {
      this.firstNameRef.nativeElement.focus();
    }, 100);
    this.pawnerForm.valueChanges.subscribe(() => {
      this.isSave = !this.pawnerForm.valid;
    });
    this.dialogService.getCity().subscribe((city) => (this.cities = city));
    this.dialogService
      .getBarangay()
      .subscribe((barangay) => (this.barangays = barangay));
  }

  home() {
    this.router.navigateByUrl('/dashboard');
  }

  reset() {
    this.pawnerForm.reset();
    this.firstNameRef.nativeElement.focus();
  }

  save() {
    const empId = JSON.parse(localStorage.getItem('user'));
    const p = this.pawnerForm.value;
    //convert address to addresses
    const address = {
      cityName: p.city,
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
    this.pawnerService
      .addPawner(pawner)
      .subscribe((newPawner) => {
        if(Object.keys(newPawner).length > 0)
        this.router.navigateByUrl('transactions/newloan/', {state:{pawner:newPawner}})
      });
  }
}
