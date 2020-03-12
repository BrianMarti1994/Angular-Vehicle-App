import { Component, OnInit } from '@angular/core';
import {VehicleService} from '../shared/vehicle.service';
import {VehicleMake} from '../shared/vehicle.model';
import{ToastrService} from 'ngx-toastr';
import { NgForm, FormBuilder, Validators, AbstractControl, FormArray, FormGroup } from '@angular/forms';
import {PaginatedInputModel,FilterParam,SortingParams} from "../shared/filter.model";

// import {SortingFormComponent} from "../shared/Sorting.component"
// import{MatSort,MatSortable} from '@angular/material/sort';
// import{MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  public PageNo:number =1;
  public PageSize:number =4;
  form: FormGroup;
  SortingParams: FormArray;
  emails: FormArray;
  

 
  constructor(public vehicleService : VehicleService,private toastr:ToastrService,private fb: FormBuilder) { }
  
  ngOnInit(): void {
 this.CreateForm();
    // this.vehicleService.getVehicleList(this.form.value);
  }
  CreateForm(){
   this.form = this.fb.group({
    PageNumber: ['', Validators.required],
    PageSize: ['', Validators.required],
    SortingParams: this.fb.array([this.SortingForm()]),
    FilterParam: this.fb.array([this.FilteringForm()])
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
    }
    Previous(){
      if  (this.PageNo > 1){
        this.PageNo=this.PageNo-1;
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
     let res = this.vehicleService.getVehicleList(this.form.value);
     alert(res);
  }
  
  submit() {
  
  console.log(JSON.stringify(this.form.value))
  }

  showForEdit(veh :VehicleMake){
    this.vehicleService.SelectedVehicle =Object.assign({},veh);
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

}
