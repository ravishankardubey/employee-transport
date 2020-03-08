import { Component, OnInit } from '@angular/core';
import { RideService } from './../../services/ride.service';
import { CommonService } from './../../services/common.service';
import { FormGroup } from '@angular/forms';
import { SeachFormbuilder } from './search.formbuilder';
import { VEHICLE_TYPE } from '../../config/constants';

@Component({
  selector: 'app-book-ride',
  templateUrl: './book-ride.component.html',
  styleUrls: ['./book-ride.component.css']
})
export class BookRideComponent implements OnInit {
  VEHICLE_TYPE = VEHICLE_TYPE;

  constructor(
    private rideService: RideService,
    private commonService: CommonService,
    private seachFormbuilder: SeachFormbuilder
  ) { }

  allRides = [];
  allLocations = {};
  searchForm = new FormGroup({});

  ngOnInit() {
    this.allRides = this.rideService.getAllRides();
    this.allLocations = this.rideService.getAllLocations();
    this.searchForm = this.seachFormbuilder.generateReactiveForm();
  }

  bookRide(driversEmployeeID) {
    const employeeId = prompt('Please enter your Employee ID');
    if (!employeeId) {
      this.commonService.openSnackbar('Please enter an Employee Id when prompted', 'error', 4);
    } else if (driversEmployeeID === employeeId) {
      this.commonService.openSnackbar('You can\'t book ride your own ride', 'error', 4);
    } else {
      try {
        this.rideService.bookRide(driversEmployeeID, employeeId);
        this.searchRides();
        this.commonService.openSnackbar('Ride Booked succesfully', 'success', 4);
      } catch (err) {
        this.commonService.openSnackbar(err.message, 'error', 4);
      }
    }
  }

  searchRides() {
    try {
      this.allRides = this.rideService.searchRide(this.searchForm.getRawValue());
    } catch (err) {
      this.commonService.openSnackbar(err.message, 'error', 4);
    }
  }

}
