import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from '../pages/notfound.component';
import { BarangayComponent } from './barangay.component';
import { CategoryDescriptionComponent } from './category-description.component';

import { CategoryComponent } from './category.component';
import { CityComponent } from './city.component';
import { PawnerComponent } from './pawner.component';
import { SetingsComponent } from './setings.component';
import { VoucherCodeComponent } from './voucher-code.component';
import { VoucherTypeComponent } from './voucher-type.component';
import { VoucherComponent } from './voucher.component';
import { VouchersettingComponent } from './vouchersetting.component';

const routes: Routes = [{
  path: '', component: SetingsComponent,
  children: [
    { path: 'city', component: CityComponent },
    { path: 'barangay', component: BarangayComponent },
    { path: 'pawner', component: PawnerComponent },
    { path: 'voucher', component: VoucherComponent },
    { path: 'vouchersetting', component: VouchersettingComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'categoryDescription', component: CategoryDescriptionComponent },
    { path: 'voucher-code', component: VoucherCodeComponent },
    { path: 'voucher-type', component: VoucherTypeComponent },
  ]
},
{path:'**',component: NotfoundComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetingsRoutingModule { }
