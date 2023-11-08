import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ControlContainer, NgForm, NgModel, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/parts/alert/alert.service';

@Component({
    selector: 'app-input-number',
    templateUrl: './input-number.component.html',
    styleUrls: ['./input-number.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }] // Permite validação de form pai em input de componente filho
})
export class InputNumberComponent implements OnChanges, AfterViewInit {

    @Input() valueInput: any;
    @Input() mask?: string;
    @Input() suffix?: string;
    @Input() prefix?: string;
    @Input() thousandSeparator = '.';
    @Input() decimalMarker: "." | "," | [".", ","] = ',';
    @Input() inputId: string = '';
    @Input() min?: number;
    @Input() max?: number;
    @Input() required: boolean = false;
    @Input() arrowControls: boolean = true;
    @Input() showErrorMessage: boolean = true;
    @Input() showPopover: boolean = true;
    @Input() allowNegativeNumbers?: boolean = false;
    @Input() placeholder = '';
    @Input() readonly = false;
    @Input() disabled = false;
    @Input() autoReplaceValue = false;
    @Input() error: ValidationErrors | null;

    @Output() valueChanges: EventEmitter<number> = new EventEmitter<number>();
    @Output() ngModelChanged: EventEmitter<NgModel> = new EventEmitter<NgModel>();
    @ViewChild('input') input: NgModel;
    viewInit = false;

    constructor(
        private alertService: AlertService,
        private toastrService: ToastrService,
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['valueInput']) {
            this.valueInput = changes['valueInput'].currentValue;
            if (this.viewInit) {
                // this.validate('ngOnChanges');
            }
        };
        if (changes['mask']) this.mask = changes['mask'].currentValue;
        if (changes['suffix']) this.suffix = changes['suffix'].currentValue;
        if (changes['prefix']) this.prefix = changes['prefix'].currentValue;
        if (changes['thousandSeparator']) this.thousandSeparator = changes['thousandSeparator'].currentValue;
        if (changes['decimalMarker']) this.decimalMarker = changes['decimalMarker'].currentValue;
        if (changes['inputId']) this.inputId = changes['inputId'].currentValue;
        if (changes['min']) this.min = changes['min'].currentValue;
        if (changes['max']) this.max = changes['max'].currentValue;
        if (changes['required']) this.required = changes['required'].currentValue;
        if (changes['arrowControls']) this.arrowControls = changes['arrowControls'].currentValue;
        if (changes['showErrorMessage']) this.showErrorMessage = changes['showErrorMessage'].currentValue;
        if (changes['showPopover']) this.showPopover = changes['showPopover'].currentValue;
        if (changes['placeholder']) this.placeholder = changes['placeholder'].currentValue;
        if (changes['allowNegativeNumbers']) this.allowNegativeNumbers = changes['allowNegativeNumbers'].currentValue;
        if (changes['readonly']) this.readonly = changes['readonly'].currentValue;
        if (changes['disabled']) this.disabled = changes['disabled'].currentValue;
        if (changes['autoReplaceValue']) this.autoReplaceValue = changes['autoReplaceValue'].currentValue;


    }

    ngAfterViewInit(): void {
        this.viewInit = true;
    }

    setErrors(errors: ValidationErrors | null) {
        this.error = errors;
        this.input.control.setErrors(this.error)
    }


    validate(where?: string ) {
        // console.log('validate', where, this.autoReplaceValue)
        this.input.control.setValue(this.valueInput)
        if (this.required == true && !this.valueInput.toString().trim()) {
            this.input.control.setErrors(Object.assign({}, { required: true }));
            return false;
        }
        else if (this.max != undefined && (this.valueInput > this.max)) {
            this.toastrService.error('O valor máximo é ' + this.max);
            if (this.autoReplaceValue) {
                this.input.control.setValue(this.max);
                this.inputChanged();
            } else {
                this.input.control.setErrors(Object.assign({}, { max: true }));
                return false;
            }
        }
        else if (this.min != undefined && (this.valueInput < this.min)) {
            this.toastrService.error('O valor mínimo é ' + this.min);
            if (this.autoReplaceValue == true) {
                this.input.control.setValue(this.min);
                this.inputChanged();
            } else {
                this.input.control.setErrors(Object.assign({}, { min: true }));
                return false;
            }
        } else {
            this.input.control.setErrors(this.error)
        }
        return true;
    }



    inputChanged() {
        // console.log('inputChanged')
        this.valueChanges.emit(this.valueInput);
        this.ngModelChanged.emit(this.input)
    }

    arrowUp(value: number, skip = 1, min = undefined, max = undefined, allowNegativeNumbers = this.allowNegativeNumbers) {
        var newValue = arrowUp({
            value: value,
            skip: skip,
            min: min,
            max: max,
            allowNegativeNumbers: allowNegativeNumbers ?? false
        });
        this.valueInput = parseFloat(newValue as unknown as string);
        setTimeout(() => this.validate('arrowUp'), 500);
        return newValue;
    }

    arrowDown(value: number, skip = 1, min = undefined, max = undefined, allowNegativeNumbers = this.allowNegativeNumbers) {
        var newValue = arrowDown({
            value: value,
            skip: skip,
            min: min,
            max: max,   
            allowNegativeNumbers: allowNegativeNumbers ?? false
        });
        this.valueInput = parseFloat(newValue as unknown as string);
        setTimeout(() => this.validate('arrowDown'), 500);
        return value;
    }
}

function arrowUp(model: FormatNumber) {
    model.value += model.skip;
    if (model.max != null && model.max != undefined && model.value > model.max)
        model.value = model.max;
    return model.value;
}

function arrowDown(model: FormatNumber) {
    var value = model.value - model.skip;
    if (!model.allowNegativeNumbers && value < 1)
        value = 0;
    else if (model.min != null && model.min != undefined && value < model.min)
        value = model.min;
    return value;
}

class FormatNumber {
    value: number = 0;
    min?: number;
    max?: number;
    skip: number = 0;
    allowNegativeNumbers: boolean = true;
}