import { Component, OnInit,TemplateRef } from '@angular/core';
import {VehicleService} from '../shared/vehicle.service';
import {VehicleMake, VehicleModel} from '../shared/vehicle.model';
import{ToastrService} from 'ngx-toastr';
import { FormBuilder, Validators,FormArray, FormGroup } from '@angular/forms';
import {FilterParam,SortingParams} from "../shared/filter.model";
import {BsModalService,BsModalRef} from "ngx-bootstrap/modal"
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  public PageNo:number =1;
  public PageSize:number =4;
 modalRef:BsModalRef;
  form: FormGroup;
  Modelform:FormGroup;
  ActionType:string;
  ModelId: number;
  
  

  constructor(public vehicleService : VehicleService,private toastr:ToastrService,private fb: FormBuilder,private modalService:BsModalService) { }
  
  ngOnInit(): void {

    
 this.CreateForm();

 this.vehicleService.getVehicleList(this.form.value);
  }
  CreateForm(){
   this.form = this.fb.group({
    PageNumber: [this.PageNo, Validators.required],
    PageSize: [this.PageSize, Validators.required],
    SortingParams: this.fb.array([this.SortingForm()]),
    FilterParam: this.fb.array([this.FilteringForm()])
  }); 

  this.Modelform=this.fb.group({
    Id:['',Validators.required],
    MakeId:['', Validators.required],
    Name:['', Validators.required],
    Abrv:['', Validators.required]
    // vehicleMake:null
  });
  
}
  SortingForm() {
    return this.fb.group({
      SortOrder: ['', Validators.required],
      ColumnName: ['', Validators.required]
    })
  }

  FilteringForm() {
    return this.fb.group({
      FilterValue: ['', Validators.required]
    })
  }
  Next(){
    
    this.PageNo=this.PageNo+1;
    this.form.get('PageNumber').setValue(this.PageNo);
    this.vehicleService.getVehicleList(this.form.value);
    
    }

    Previous(){
      if  (this.PageNo > 1){
        this.PageNo=this.PageNo-1;
        this.form.get('PageNumber').setValue(this.PageNo);
        this.vehicleService.getVehicleList(this.form.value);
      }
    }
  addSortingParams(Sorting: SortingParams) {
    const control = this.form.get('SortingParams') as FormArray;
    let totalItems = control.value.length;
    while (totalItems > 0) {
      totalItems--;
      control.removeAt(totalItems);
    }
    control.push(this.fb.group(Sorting));
  }

  addFilteringParams( Filtering: FilterParam){
    
    const control = this.form.get('FilterParam') as FormArray;
    let totalItems = control.value.length;
    while (totalItems > 0) {
      totalItems--;
      control.removeAt(totalItems);
    }

    control.push(this.fb.group(Filtering));
   this.vehicleService.getVehicleList(this.form.value);
     
  }
 public openModal(template:TemplateRef<any>,veh :VehicleMake){
  this.ActionType ="Add";
  this.Modelform.reset();
  this.vehicleService.SelectedVehicle =Object.assign({},veh);
  
     this.modalRef = this.modalService.show(template);
 }
  // submit() {
  //   alert( JSON.stringify(this.form.value))
  // console.log(JSON.stringify(this.form.value))
  // }
  AddModel(){
  
    this.vehicleService.postVehicleModel(this.Modelform.value)
     //  this.vehicleService.getVehicleList();
      this.toastr.info('Record Added Successfully','Vehicle Register')
     
    this.vehicleService.getVehicleList(this.form.value);
  }
  UpdateModel(){
    console.log( JSON.stringify(this.Modelform.value));
    this.vehicleService.UpdateVehicleModel(this.Modelform.value)
    this.toastr.info('Record Updated Successfully','Vehicle Register')
  }

   showForEdit(veh :VehicleMake){
  
    this.vehicleService.SelectedVehicle =Object.assign({},veh);
    
  }

  showForEditModel(template:TemplateRef<any>,veh :VehicleMake,Id :number)
  {
    this.ActionType ="Update";
    this.ModelId =Id
    this.vehicleService.SelectedVehicle =Object.assign({},veh);
    this.modalRef = this.modalService.show(template);
  }
  onDelete(vel:VehicleMake)
  {
    if(confirm('Are you sure to delete this record ?')==true){
     
this.vehicleService.deleteVehicle(vel)
.subscribe(x => {
  this.vehicleService.getVehicleList(this.form.value);
this.toastr.warning("Deleted Successfully","Vehicle Register")
})
    }
  }
onDeleteModel(vel :VehicleModel)
{if(confirm('Are you sure to delete this record ?')==true){
  
  this.vehicleService.DeleteVehicleModel(vel);
  this.toastr.warning("Deleted Successfully","Vehicle Register")
}

}
CloseModel(){
  
}
}
