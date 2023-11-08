import { Injectable } from "@angular/core";
import { MaxValidator, RangeValueAccessor } from "@angular/forms";


@Injectable({
    providedIn: 'root'
})
export class Format {


}

export function trim(value: string) {
    return value.toString().trim();
}
export function stringToDecimal(value: string) {
    value = value.replace('R$', '').replace('%', '').replace(' ', '').replace('.', '').replace(',', '.')
    return parseFloat(value);
}

export function arrowUp(value: any = 0, maxNumber?: number) {
    value = ++value;
    if (maxNumber != null && maxNumber != undefined && value > maxNumber) {
        value = maxNumber;
    }
    return value;
}

export function arrowDown(value: any = 0, allowNegative: boolean = false) {
    value = --value;
    if (value < 0 && !allowNegative)
        value = 0
    return value;
}
