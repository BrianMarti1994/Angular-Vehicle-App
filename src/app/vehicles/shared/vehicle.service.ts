import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable, from} from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {VehicleMake, VehicleModel} from'./vehicle.model';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { PaginatedInputModel } from './filter.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  FilterData: any;
  SelectedVehicle :VehicleMake;
  SelectedVehicleModel :VehicleModel;
  Jsondata :any;
  VehicleLsit:VehicleMake[];

  Pagi :PaginatedInputModel;
  constructor(private http:Http) { }


  getVehicleList(Jsondata: any){
    this.http.get('http://localhost:13042/api/VehicleMake/GetVehicleMake?pagingParams='+ JSON.stringify(Jsondata))
    .map((data:Response)=>{
      return data.json() as VehicleMake[]
    }).toPromise().then(x => { this.VehicleLsit =x})
}


  postVehicle(veh: VehicleMake){
    let body = JSON.stringify(veh)
    var headerOptions = new Headers({'Content-Type':'application/json'})
    var requestOptions = new RequestOptions({method:RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:13042/api/VehicleMake/AddVehiclesMake',body,requestOptions).map(x=>x.json());
  }
  postVehicleModel(veh: VehicleModel){
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  return this.http.post('http://localhost:13042/api/VehicleModel/AddVehicleModel', veh, options).toPromise()
         .then(this.extractData)
         .catch(this.handleErrorPromise);
  }
  UpdateVehicleModel(veh: VehicleModel){
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:13042/api/VehicleModel/UpdateVehicleModel', veh, options).toPromise()
           .then(this.extractData)
           .catch(this.handleErrorPromise);
    }

    DeleteVehicleModel(veh: VehicleModel){
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post('http://localhost:13042/api/VehicleModel/DeleteVehicleModel', veh, options).toPromise()
             .then(this.extractData)
             .catch(this.handleErrorPromise);
      }

  handleErrorPromise(handleErrorPromise: any) {
    throw new Error("Method not implemented.");
  }
  extractData(extractData: any) {
    throw new Error("Method not implemented.");
  }


 
 
 

  updateVehicle(veh: VehicleMake){
    var body = JSON.stringify(veh)
    var headerOptions = new Headers({'Content-Type':'application/json'})
    var requestOptions = new RequestOptions({method:RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:13042/api/VehicleMake/UpdateVehicleMake',body,requestOptions).map(x=>x.json());
  }
  deleteVehicle(veh: VehicleMake)
  {var body = JSON.stringify(veh)
    console.log(body)
    var headerOptions = new Headers({'Content-Type':'application/json'})
    var requestOptions = new RequestOptions({method:RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:13042/api/VehicleMake/DeleteVehicleMake',body,requestOptions).map(x=>x.json());
   
  }
}
