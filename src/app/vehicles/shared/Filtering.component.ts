import { Component, Output, EventEmitter } from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {FilterParam} from "../shared/filter.model";

@Component({
    selector: 'addFilteringParams-form',
    template:`
    <form [formGroup]="form" (ngSubmit)="submit()" >

    <div class="row">
        <div class="col-sm-6">
        <label></label> 
        
            <input formControlName="FilterValue" class="form-control" placeholder="Search" type="text">
        </div>
        <div class="col-sm-6">
        <label> </label> 
     
            <button class="form-control" class="btn btn-md btn-block btn-info"  type="submit">Search</button>
        </div>
    </div>   
   
    </form>
    `,styles: [`
    .container {
      border: 1px solid black;
      border-radius: 4px;
      margin: 15px;
    }
  `]
})
 
export class FilteringFormComponent  {
  
    constructor(private fb: FormBuilder) {}
    @Output('newFilteringParams') addFilteringParams: EventEmitter<FilterParam> = new EventEmitter<FilterParam>();
  
    form = this.fb.group({
        FilterValue: ['', Validators.required]
    });
  submit() {
   alert("Filter-Comp");
      this.addFilteringParams.emit(this.form.value);
      
  }

}