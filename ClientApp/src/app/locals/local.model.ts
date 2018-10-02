export class Local {

    constructor(data?: Object){
        Object.keys(data||{}).forEach(attr=>this[attr]=data[attr]);
    }

    validate(){
        if(!this.name) throw new Error("Local must have a name");
        if(this.numberSeat<=0) throw new Error("The number seat in local is an invalid number");
    }

    public toString():string{
        return "Local '"+this.name+"' ("+this.numberSeat+" places)";
    }

    id: number;
    name: string;
    numberSeat: number;
}