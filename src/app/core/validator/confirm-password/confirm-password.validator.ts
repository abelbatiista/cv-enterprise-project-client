import { AbstractControl, ValidationErrors } from "@angular/forms";

export function ConfirmPasswordValidator(controlName: string, matchingControlName: string): 
(group: AbstractControl) => ValidationErrors | null {
    return (group: AbstractControl):  ValidationErrors | null => { 
        let password = group.get(controlName)!.value;
        let confirmPassword = group.get(matchingControlName)!.value
        return password === confirmPassword ? null : { notEqualPassword: true }
    }
}