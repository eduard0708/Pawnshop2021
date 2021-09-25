import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select } from '../_model/select';
import { DialogsService } from '../_service/dialogs.service';
import { PawnerService } from '../_service/pawner.service';

@Component({
  selector: 'app-pawner',
  templateUrl: './pawner.component.html',
  styleUrls: ['_settings.sass/pawner.scss'
  ]
})
export class PawnerComponent implements OnInit {
  @ViewChild('firstNameRef',{static:true}) firstNameRef: any;
  pawnerForm: FormGroup;
  cities:Select[]=[];
  barangays:Select[]=[];
  isSave:boolean = true;

  constructor(
    private pawnerService: PawnerService,
    private fb: FormBuilder,
    private router: Router,
    private dialogService:DialogsService
  ) {
    this.pawnerForm = fb.group({
      id:[],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      city: ['', Validators.required],
      barangay: ['', Validators.required],
      conpleteAddress: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.pawnerForm.valueChanges.subscribe(()=> {
      this.isSave = !this.pawnerForm.valid;
    });
    this.dialogService.getCity().subscribe(city => this.cities = city);
    this.dialogService.getBarangay().subscribe(barangay => this.barangays = barangay);
  }

  home() {
    this.router.navigateByUrl('/dashboard')
  }

  reset(){
    this.pawnerForm.reset();
    this.firstNameRef.nativeElement.focus();  
  }

  save() {
    console.log(this.pawnerForm.value);
    
    // let navigationExtras  = {
    //   state: {
    //     pawner: this.pawnerForm.value
    //   }
    // };
    // this.pawnerService.createPawner(this.pawnerForm.value);
    // this.router.navigateByUrl('/transactions/newloan/', navigationExtras);
  }
}
