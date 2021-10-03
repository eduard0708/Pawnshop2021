
export class CalcDate{
    today = new Date();

    constructor(private transactionDate:Date){
    }

    getDays(){
        const totalDays = Math.floor(+((this.today.getTime() - this.transactionDate.getTime() ) / (24*3600*1000))) ;
       return totalDays;
    }
    getMonhts(){
        var d1Y = this.today.getFullYear();
        var d2Y = this.transactionDate.getFullYear();
        var d1M = this.today.getMonth();
        var d2M = this.transactionDate.getMonth();

       return Math.ceil((d2M+12*d2Y) - (d1M+12*d1Y));

    }
    getYears(){
       return Math.ceil(this.transactionDate.getFullYear() - this.today.getFullYear());
    }

    getStatus(){
        if(this.transactionDate <= this.today){
            return 'Expired'
        }else{
            return 'Matured'
        }
    }

}