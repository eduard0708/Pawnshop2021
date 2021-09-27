import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from '../_dialogs/notifier/notifier.component';
import { NotifierConfig } from '../_model/notifier.config';

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  config: NotifierConfig;
  constructor(private snackBar: MatSnackBar) {}

  error(message: string) {
    this.snackBar.openFromComponent(NotifierComponent, {
      data: { message: message, title: 'Error!', icon: 'clear' },
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 5000,
      panelClass: 'error',
    });
  }
  
  success(message: string) {
   let s = this.snackBar.openFromComponent(NotifierComponent, {
      data: { message: message, title: 'Success!', icon: 'check' },
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 5000,
      panelClass: 'success',
    });
  }

  info(message: string) {
    let s = this.snackBar.openFromComponent(NotifierComponent, {
       data: { message: message, title: 'Info!', icon: 'info' },
       verticalPosition: 'top',
       horizontalPosition: 'right',
       duration: 5000,
       panelClass: 'success',
     });
   }

  showNotification(
    message: string,
    action: string,
    panelclass: string,
    config1: any
  ) {
    this.snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: message,
        errorType: panelclass,
      },
      // verticalPosition:'top',
      // horizontalPosition:'right',
      // duration:2000,
      // panelClass: panelclass,
    });
  }
}
