export class DateHelper {

    constructor(private date:Date){
    }

    //if you will used directly the toISOString the date will be change to UTC and return wrong date
    //this function will return the right date input
    dateToISOstring(){
       let isoDate = (new Date(this.date).getTime() - new Date(this.date).getTimezoneOffset() * 60000);
        return new Date(isoDate).toISOString();
    }

}