
export class NotifierConfig {

    constructor(public duration: number = 2000,
        public horizontalPosition: string = 'right',
        public verticalPosition: string = 'top') {
    }

    public data(message, panelClass) {
        return { meessag: message, panelClass: panelClass }
    }
}

