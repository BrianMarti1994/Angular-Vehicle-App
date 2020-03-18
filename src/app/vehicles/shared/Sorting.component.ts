import { Component, Output, EventEmitter } from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {SortingParams} from "../shared/filter.model";
import { VehicleService } from './vehicle.service';

import {VehicleListComponent} from '../vehicle-list/vehicle-list.component'
import{ToastrService} from 'ngx-toastr';
@Component({
    selector: 'addSortingParams-form',
    template: `
    
    <form [formGroup]="form">
        <div class="form-row">   
            <div class="col-sm-6">
               
              <label>Sort By</label> <select id ="SortOrder"  formControlName="SortOrder"  class="form-control" (ngModelChange)="SortFunction()">
                  <option>Asc</option>
                  <option>Desc</option>
                </select>
            </div>
            <div class="form-group col-sm-6">
            <label>Sort Column</label> <select id ="ColumnName"  formControlName="ColumnName"  class="form-control" (ngModelChange)="SortFunction()">
              <option>Id</option>
               <option>Name</option>
                <option>Abrv</option>
              </select>
            </div>    
        </div>
    </form>
     
    `,
    styles: [`
      .container {
        border: 1px solid black;
        border-radius: 4px;
        margin: 15px;
      }
    `]
  })
  export class SortingFormComponent  {
    constructor(public vehicleService : VehicleService,private toastr:ToastrService,private fb: FormBuilder) {}
   
   
    
    @Output('newSortingParams') addSortingParams: EventEmitter<SortingParams> = new EventEmitter<SortingParams>();
  
    form = this.fb.group({
        SortOrder: ['', Validators.required],
        ColumnName: ['', Validators.required]
    });
  

    SortFunction(){
     
      this.addSortingParams.emit(this.form.value);
  
    }

    
  
  }