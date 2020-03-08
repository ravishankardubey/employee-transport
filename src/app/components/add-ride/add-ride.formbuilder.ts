import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';


@Injectable()
export class AddRideFormBuilder {

    constructor() { }

    generateReactiveForm() {
        return new FormGroup({
            employeeId: new FormControl('', [Validators.required]),
            vehicleType: new FormControl('', [Validators.required]),
            vehicleNo: new FormControl('', [Validators.required]),
            vacantSeats: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]),
            time: new FormControl('', [Validators.required]),
            pickupPoint: new FormControl('', [Validators.required]),
            destination: new FormControl('', [Validators.required]),
            riders: new FormArray([])
        });
    }
}
