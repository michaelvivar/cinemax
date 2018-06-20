import { AbstractControl, ValidatorFn } from "@angular/forms";


function greaterThan(ctrl: AbstractControl, minutes = 0): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const start = time(ctrl.value) + minutes;
        const end = time(control.value);
        return start > end ? { 'greater-than': control.value } : null
    };
}

function time(time: string) {
    let hour = parseInt(time.split(':')[0]);
    let minute = parseInt(time.split(':')[1].split(' ')[0]);
    if (time.split(':')[1].split(' ')[1] == 'PM') {
      hour += 12;
    }
    return (hour * 60) + minute;
}

export const timeValidator = {
    greaterThan
}