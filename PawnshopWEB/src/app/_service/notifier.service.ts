import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from '../_dialogs/notifier/notifier.component';
import { NotifierConfig } from '../_model/notifier.config';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar: MatSnackBar) {

   }
  
  showNotification(message:string, action: string, panelclass:string, config: any){

      this.snackBar.openFromComponent(NotifierComponent, {
      data:{
        message:message,
        errorType:panelclass
      },
      verticalPosition:'top',
      horizontalPosition:'right',
      duration:2000,
      panelClass: panelclass,
    })
  }

}
