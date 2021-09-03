import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from '../_dialogs/notifier/notifier.component';
import { NotifierConfig } from '../_model/notifier-config';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {


  constructor(private snackBar: MatSnackBar) {

   }

  
  showNotification(message:string, action: string, config:any){
   const configT = new NotifierConfig()
    this.snackBar.openFromComponent(NotifierComponent, configT as any)
  }

}
