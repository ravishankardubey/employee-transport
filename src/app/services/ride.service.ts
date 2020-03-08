import { Injectable } from '@angular/core';
import { DATA_STORE_CONST } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  constructor() { }

  getAllRides(): Array<any> {
    try {
      return JSON.parse(localStorage.getItem(DATA_STORE_CONST.ride_details)) || [];
    } catch (err) {
      throw Error('Error while reading all ride details : ' + err.errmsg);
    }
  }

  saveRideDetails(rideDetails) {
    try {
      const ALL_RIDES = this.getAllRides();
      for (const ride of ALL_RIDES) {
        if (ride.employeeId === rideDetails.employeeId) {
          throw new Error('Employee Already registered with another ride');
        }
      }

      ALL_RIDES.push(rideDetails);
      localStorage.setItem(DATA_STORE_CONST.ride_details, JSON.stringify(ALL_RIDES));
      return ALL_RIDES;
    } catch (err) {
      throw Error('Error while saving ride details : ' + err.message || err.errmsg);
    }
  }

  bookRide(driversEmployeeID, employeeId) {
    try {
      const ALL_RIDES = this.getAllRides();
      for (const ride of ALL_RIDES) {
        if (ride.employeeId === driversEmployeeID) {
          if (ride.vacantSeats > 0 && !ride.riders.includes(employeeId)) {
            ride.riders.push(employeeId);
            ride.vacantSeats--;
            break;
          } else {
            throw new Error('Not enough or Already booked by you, please choose other ride');
          }
        }
      }
      localStorage.setItem(DATA_STORE_CONST.ride_details, JSON.stringify(ALL_RIDES));
      return ALL_RIDES;
    } catch (err) {
      throw Error('Error while booking the ride : ' + err.message || err.errmsg);
    }
  }

  searchRide(searchParams) {
    try {
      const ALL_RIDES = this.getAllRides();

      const FILTERED_RIDES = ALL_RIDES.filter(ride => {
        let isRideAvailable = true;
        if (isRideAvailable && searchParams.pickup && searchParams.pickup !== ride.pickupPoint) {
          isRideAvailable = false;
        }

        if (isRideAvailable && searchParams.drop && searchParams.drop !== ride.destination) {
          isRideAvailable = false;
        }

        if (isRideAvailable && searchParams.time && !this.isTimeWithiRange(searchParams.time, ride.time)) {
          isRideAvailable = false;
        }

        if (isRideAvailable && searchParams.vehicleType && searchParams.vehicleType !== ride.vehicleType) {
          isRideAvailable = false;
        }

        if (isRideAvailable) {
          return ride;
        }
      });
      return FILTERED_RIDES;
    } catch (err) {
      throw Error('Error while searching rides : ' + err.errmsg);
    }
  }


  isTimeWithiRange(searchedTime, rideTime) {
    const splittedTime = searchedTime.split(':');
    const minTime = splittedTime[0] === '00' ? '00:00' :
      (parseInt(splittedTime[0], 10) - 1).toString().padStart(2, '0') + ':' + splittedTime[1];
    const maxTime = splittedTime[0] === '23' ? '23:59' :
      (parseInt(splittedTime[0], 10) + 1).toString().padStart(2, '0') + ':' + splittedTime[1];
    if (rideTime >= minTime && rideTime <= maxTime) {
      return true;
    }
    return false;
  }

  getAllLocations() {
    try {
      const pickup = new Set();
      const drop = new Set();
      const ALL_RIDES = this.getAllRides();
      for (const ride of ALL_RIDES) {
        pickup.add(ride.pickupPoint);
        drop.add(ride.destination);
      }
      return { pickup: Array.from(pickup), drop: Array.from(drop) };
    } catch (err) {
      throw Error('Error while fetching pickup and drop locations : ' + err.errmsg);
    }
  }


}
