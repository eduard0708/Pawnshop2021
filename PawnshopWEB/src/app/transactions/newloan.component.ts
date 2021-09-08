import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { __values } from 'tslib';
import { Pawner } from '../_model/pawner';

@Component({
  selector: 'app-newloan',
  templateUrl: './newloan.component.html',
})
export class NewloanComponent implements OnInit {
  @ViewChild('category') categoryRef :MatSelect
  pawner: Pawner = {} as Pawner;
  formDates: FormGroup;
  today = new Date();
  dateMature = new Date(new Date().setMonth(new Date().getMonth() + 1));
  dateExpire = new Date(new Date().setMonth(new Date().getMonth() + 4));
  dataSource = [];
  isDisable = false;
  items = [
    {
      category: 'Gold',
      categoryDescription: '18k Bracelet',
      description: '17" bracelet gold',
      appraisalValue: 17000,
    },
    {
      category: 'Gold',
      categoryDescription: '18k Bracelet',
      description: '17" bracelet gold',
      appraisalValue: 1500,
    },
  ];
  displayColumns: string[] = [
    'category',
    'categoryDescription',
    'description',
    'appraisalValue',
    'action',
  ];

  categories = [
    { value: 'gold', viewValue: 'Gold' },
    { value: 'appliance', viewValue: 'Appliances' },
  ];

  categoryDescriptions = [
    { value: 'gold', viewValue: '18K gold' },
    { value: 'gold', viewValue: '21K gold' },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pawner = this.router.getCurrentNavigation().extras.state.pawner;
      }
    });

    this.formDates = fb.group({
      dateTransaction: [this.today],
      dateGranted: [this.today],
      dateMature: [this.dateMature],
      dateExpired: [this.dateExpire],
      category: [''],
      categoryDescriptions: [''],
      
    });
  }

  ngOnInit(): void {
    this.dataSource = this.items;
    setTimeout(() => {
      this.categoryRef.focus();  
    }, 100);

  }
  onCategorySelect(){
    if(this.formDates.controls['category'].value  === ''){
      this.categoryRef.focus();
    }
    
    this.formDates.controls['category'].disable();
  }
  onClear(){
    this.formDates.controls['category'].enable();
    this.categoryRef.focus();
  }
 
}
