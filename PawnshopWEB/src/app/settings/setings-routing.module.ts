import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from '../pages/notfound.component';
import { BarangayComponent } from './barangay.component';
import { CityComponent } from './city.component';
import { PawnerComponent } from './pawner.component';
import { SetingsComponent } from './setings.component';
import { VoucherComponent } from './voucher.component';
import { VouchersettingComponent } from './vouchersetting.component';

const routes: Routes = [{
  path: '', component: SetingsComponent,
  children: [
    { path: 'city', component: CityComponent },
    { path: 'barangay', component: BarangayComponent },
    { path: 'pawner', component: PawnerComponent },
    { path: 'voucher', component: VoucherComponent },
    { path: 'vouchersetting', component: VouchersettingComponent }
  ]  
},
{path:'**',component: NotfoundComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetingsRoutingModule { }
