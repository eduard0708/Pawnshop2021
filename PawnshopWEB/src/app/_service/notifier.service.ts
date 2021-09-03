import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierConfig } from '../_model/notifier-config';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {


  constructor(private snackBar: MatSnackBar) {

   }

  
  showNotification(message:string, action: string, config:any){
    this.snackBar.open(message, action, config )
  }

}
