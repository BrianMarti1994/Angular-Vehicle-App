import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleComponent } from './vehicles/vehicle/vehicle.component';
import { VehicleListComponent } from './vehicles/vehicle-list/vehicle-list.component';
import {HttpModule} from '@angular/http';
import {ToastrModule} from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import{SortingFormComponent} from '../app/vehicles/shared/Sorting.component';
import{FilteringFormComponent} from '../app/vehicles/shared/Filtering.component';
import { from } from 'rxjs';



@NgModule({
  declarations: [
    AppComponent,
    VehiclesComponent,
    VehicleComponent,
    VehicleListComponent,
    SortingFormComponent,
    FilteringFormComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule  ,
    HttpModule,
    BrowserModule,
    NgxPaginationModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
