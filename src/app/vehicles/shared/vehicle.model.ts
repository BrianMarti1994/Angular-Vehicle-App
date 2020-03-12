export class VehicleMake {
     Id :Number;
     Name :String;
     Abrv :String;
     vehicleModels:VehicleModel[];
}

export class VehicleModel {
     Id :Number;
     MakeId:Number;
     Name :String;
     Abrv :String;
}
