import { Component, OnInit } from '@angular/core';
import { AddRideFormBuilder } from './add-ride.formbuilder';
import { RideService } from '../../services/ride.service';
import { FormGroup } from '@angular/forms';
import { VEHICLE_TYPE } from '../../config/constants';
import { CommonService } from './../../services/common.service';

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css']
})
export class AddRideComponent implements OnInit {
  VEHICLE_TYPE = VEHICLE_TYPE;

  constructor(
    private addRideFormBuilder: AddRideFormBuilder,
    private rideService: RideService,
    private commonService: CommonService
  ) { }

  rideForm = new FormGroup({});

  ngOnInit() {
    this.rideForm = this.addRideFormBuilder.generateReactiveForm();
  }

  addRide() {
    try {
      this.rideService.saveRideDetails(this.rideForm.getRawValue());
      this.commonService.openSnackbar('Ride added succesfully', 'success', 3);
    } catch (err) {
      this.commonService.openSnackbar(err.message, 'error', 3);
    }
  }

}
