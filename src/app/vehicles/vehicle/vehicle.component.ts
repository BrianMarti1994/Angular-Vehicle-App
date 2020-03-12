import { Component, OnInit } from '@angular/core';
import {VehicleService} from '../shared/vehicle.service'
import { NgForm } from '@angular/forms';
import{ToastrService} from 'ngx-toastr';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  constructor(public vehicleService : VehicleService,private toastr:ToastrService ) { }

  ngOnInit(): void {
    this.resetForm();
  }
   resetForm(form?:NgForm){
     if(form !=null)
     form.reset();
     this.vehicleService.SelectedVehicle={
       Id:null,
       Name:'',
       Abrv:'',
       vehicleModels:null
     }
   }

   onSubmit(form:NgForm){
     if(form.value.Id == null){
     this.vehicleService.postVehicle(form.value)
     .subscribe(data=>
      {this.resetForm(form)
      // this.vehicleService.getVehicleList();
      this.toastr.success('New Record Added Successfully','Vehicle Register')
    });
     }
     else
     {
      this.vehicleService.updateVehicle(form.value)
      .subscribe(data=>
       {this.resetForm(form)
      //  this.vehicleService.getVehicleList();
       this.toastr.info('Record Updated Successfully','Vehicle Register')
      });
     }
   }
}
