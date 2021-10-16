import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddPawner } from '../_model/pawner/AddPawner';
import { Pawner } from '../_model/pawner/Pawner';
import { PawnerInfo } from '../_model/pawner/PawnerInfo';
import { AddressService } from './address.service';

@Injectable({
  providedIn: 'root',
})
export class PawnerService {
  uriJson: string = 'http://localhost:3000/';
  url = environment.baseUrl + 'pawner/';

  pawnerInfo = {} as any;
  private pawnerSource = new ReplaySubject<PawnerInfo>(1);
  pawnerSource$ = this.pawnerSource.asObservable();

  constructor(private http: HttpClient) {}

  searchPawner() {
    return this.http.get<Pawner[]>(this.uriJson + 'pawner');
  }

  createPawner(pawner: Pawner) {
    this.http.post(this.url + 'add-pawner', pawner).subscribe((data) => {});
  }

  addPawner(pawner: AddPawner) {
    return this.http.post<Pawner>(this.url + 'add-pawner', pawner);
  }

  findPawnerByContactNumber(contactNumber: number) {
    return this.http.get<Pawner[]>(
      this.url + `contact-number/${contactNumber}`
    );
  }

  findTransactionNumber() {}

  takePawnerInfo(pawnerInfo) {
   this.pawnerSource.next(pawnerInfo);
  }

  normalizedPawnerInfo(pawnerInfo, dateTransaction, DateGranted, dateMatured, dateExpired): PawnerInfo{
    let pawner:PawnerInfo = pawnerInfo as any
    pawner.dateTransaction = dateTransaction as any;
    pawner.dateGranted =  DateGranted as any;
    pawner.dateMatured =  dateMatured as any;
    pawner.dateExpired = dateExpired as any;
    return pawner

  }
}
