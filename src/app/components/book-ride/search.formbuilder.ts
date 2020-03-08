import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Injectable()
export class SeachFormbuilder {

    constructor() { }

    generateReactiveForm() {
        return new FormGroup({
            pickup: new FormControl(''),
            drop: new FormControl(''),
            time: new FormControl(''),
            vehicleType: new FormControl('')
        });
    }
}
