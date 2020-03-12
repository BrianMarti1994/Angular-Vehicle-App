import { Component, OnInit } from '@angular/core';
import {VehicleService} from './shared/vehicle.service'


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
  providers:[VehicleService]
})
export class VehiclesComponent implements OnInit {

  constructor(private vehicleService:VehicleService,) { }

  ngOnInit(): void {

  }

}
