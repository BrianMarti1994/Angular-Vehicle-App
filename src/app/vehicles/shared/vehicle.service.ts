import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable, from} from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {VehicleMake} from'./vehicle.model';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { PaginatedInputModel } from './filter.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  FilterData: any;
  SelectedVehicle :VehicleMake;
  Jsondata :any;
  VehicleLsit:VehicleMake[];

  Pagi :PaginatedInputModel;
  constructor(private http:Http) { }

  postVehicle(veh: VehicleMake){
    let body = JSON.stringify(veh)
    console.log(body)
    var headerOptions = new Headers({'Content-Type':'application/json'})
    var requestOptions = new RequestOptions({method:RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:13042/api/VehicleMake/AddVehiclesMake',body,requestOptions).map(x=>x.json());
  }


  getVehicleList(Jsondata: any){
   

this.http.get('http://localhost:13042/api/VehicleMake/GetVehicleMake?pagingParams='+ JSON.stringify(Jsondata))
.map((data:Response)=>{
  return data.json() as VehicleMake[]
}).toPromise().then(x => { this.VehicleLsit =x})

    // this.http.get('http://localhost:13042/api/VehicleMake/GetVehicleMake',{headers:headers,params:jdata})
    // .map((data:Response)=>{
    //   return data.json() as Vehicle[]
    // }).toPromise().then(x => {
    //   this.VehicleLsit =x
    // })
    
  }
 
  
  // getVehicleList(){
    
  //   this.http.get('http://localhost:48007/api/Vehicle/ShowVehicleList').map((data:Response)=>{
  //     return data.json() as Vehicle[]
  //   }).toPromise().then(x => {
  //     this.VehicleLsit =x
  //   })
  // }


  updateVehicle(veh: VehicleMake){
    var body = JSON.stringify(veh)
    var headerOptions = new Headers({'Content-Type':'application/json'})
    var requestOptions = new RequestOptions({method:RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:48007/api/Vehicle/UpdateVehicle',body,requestOptions).map(x=>x.json());
  }
  deleteVehicle(veh: VehicleMake)
  {var body = JSON.stringify(veh)
    console.log(body)
    var headerOptions = new Headers({'Content-Type':'application/json'})
    var requestOptions = new RequestOptions({method:RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:48007/api/Vehicle/DeleteVehicle',body,requestOptions).map(x=>x.json());
   
  }
}
