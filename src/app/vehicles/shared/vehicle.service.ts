import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {Vehicle} from'./vehicle.model';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  SelectedVehicle :Vehicle;
  VehicleLsit:Vehicle[];
  constructor(private http:Http) { }

  postVehicle(veh: Vehicle){
    var body = JSON.stringify(veh)
    console.log(body)
    var headerOptions = new Headers({'Content-Type':'application/json'})
    var requestOptions = new RequestOptions({method:RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:48007/api/Vehicle/AddVehicle',body,requestOptions).map(x=>x.json());
  }

  getVehicleList(){
    this.http.get('http://localhost:48007/api/Vehicle/ShowVehicleList').map((data:Response)=>{
      return data.json() as Vehicle[]
    }).toPromise().then(x => {
      this.VehicleLsit =x
    })
  }

  updateVehicle(veh: Vehicle){
    var body = JSON.stringify(veh)
    console.log(body)
    var headerOptions = new Headers({'Content-Type':'application/json'})
    var requestOptions = new RequestOptions({method:RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:48007/api/Vehicle/UpdateVehicle',body,requestOptions).map(x=>x.json());
  }
  deleteVehicle(veh: Vehicle)
  {var body = JSON.stringify(veh)
    console.log(body)
    var headerOptions = new Headers({'Content-Type':'application/json'})
    var requestOptions = new RequestOptions({method:RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:48007/api/Vehicle/DeleteVehicle',body,requestOptions).map(x=>x.json());
   
  }
}
