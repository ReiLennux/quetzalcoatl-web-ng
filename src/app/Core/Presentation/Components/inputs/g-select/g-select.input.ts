import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-g-select',
  templateUrl: './g-select.input.html',
  styleUrls: ['./g-select.input.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GSelectInputComponent),
      multi: true
    }
  ]
})
export class GSelectInputComponent implements ControlValueAccessor {
  @Input() name = '';
  @Input() placeholder = '';
  @Input() validation = false;
  @Input() disabled = false;
  @Input() label = '';
  @Input() readOnly = false;
  @Input() errorMessage = '';
  @Input() options: { value: number; label: string }[] = [{ value: 0, label: '' }];

  private _value = '';

  set value(val: string) {
    if (val !== this._value) {
      this._value = val;
      this.onChange(val);
      this.onTouched();
    }
  }

  get value(): string {
    return this._value;
  }

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this._value = value;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
