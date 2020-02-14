import { Component, OnInit } from '@angular/core';
import {VehicleService} from '../shared/vehicle.service';
import {Vehicle} from '../shared/vehicle.model';
import{ToastrService} from 'ngx-toastr';
// import{MatSort,MatSortable} from '@angular/material/sort';
// import{MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  pageActual:number =1;
  // the code for MatTable
  // displayedColums =["Id","Name","Abrv"]
  //  dataSource;
  // the code for MatTable
  constructor(public vehicleService : VehicleService,private toastr:ToastrService ) { }

  ngOnInit(): void {
    this.vehicleService.getVehicleList();
  }
  showForEdit(veh :Vehicle){
    this.vehicleService.SelectedVehicle =Object.assign({},veh);
  }
  onDelete(vel:Vehicle)
  {
    if(confirm('Are you sure to delete this record ?')==true){
this.vehicleService.deleteVehicle(vel)
.subscribe(x => {
  this.vehicleService.getVehicleList();
this.toastr.warning("Deleted Successfully","Vehicle Register")
})
    }
  }
}
