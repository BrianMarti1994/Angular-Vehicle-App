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
      // var body =JSON.stringify(Jsondata);
  //   let params: HttpParams = new HttpParams({
  //     encoder: new MyCustomHttpUrlEncodingCodec()
  // });
  // params = params.append("pagingParams", encodeURIComponent(JSON.stringify(vehs)));
//  let params = new HttpParams()
//     encoder: new MyCustomHttpUrlEncodingCodec()
// });

//  params = params.set("pagingParams",JSON.stringify(Jsondata));
//  params = params.set("PageSize",JSON.stringify(vehs.PageSize));
//  params = params.set("SortingParams",JSON.stringify(vehs.SortingParams));
//  params = params.set("FilterParam",JSON.stringify(vehs.FilterParam));
// params = params.append("PageNumber",JSON.stringify(vehs.PageNumber));
// params = params.append("PageSize",JSON.stringify(vehs.PageSize));
// params = params.append("SortingParams",JSON.stringify(vehs.SortingParams));
// params = params.append("FilterParam",JSON.stringify(vehs.FilterParam));
    //  const  params = new HttpParams({encoder: new CustomURLEncoder()})
    //  .set("PageNumber",vehs.PageNumber.toString())
    // .set("PageSize",JSON.stringify(vehs.PageSize)).set("SortingParams",JSON.stringify(vehs.SortingParams))
    // .set("FilterParam",JSON.stringify(vehs.FilterParam));
//  var headerOptions = new Headers({'Content-Type', 'multipart/form-data'},{})
// let formdata= new FormData();
// formdata.append('PageNumber',JSON.stringify(vehs.PageNumber));
// formdata.append('PageSize',JSON.stringify(vehs.PageSize));
// formdata.append('SortingParams',JSON.stringify(vehs.SortingParams));
// formdata.append('FilterParam',JSON.stringify(vehs.FilterParam));
// // let hd = new Headers();
// hd = hd.append('Content-Type', 'multipart/form-data');
// hd = hd.append('Accept', 'multipart/form-data');
// let headers = new Headers({
//   'Content-Type': 'application/json','Accept':'application/json'
//   });

//   alert(formdata);
//  let headers  = new HttpHeaders()
//     .set('Accept', 'application/json');
// // var requestOptions = new RequestOptions({HttpHeaders:httpHeaders,params:formdata})

//  alert(encodeURIComponent(body));
//,'Accept':'application/json'
// var headerOptions = new Headers({'Content-Type': 'application/json','Accept': 'q=0.8;application/json;q=0.9'})
// var requestOptions = new RequestOptions({method:RequestMethod.Post,headers:headerOptions})


this.http.get('http://localhost:13042/api/VehicleMake/GetVehicleMake?pagingParams='+ JSON.stringify(Jsondata))
.map((data:Response)=>{
  return data.json() as VehicleMake[]
}).toPromise().then(x => {
  this.VehicleLsit =x
})

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
