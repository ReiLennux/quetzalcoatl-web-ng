import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-g-text',
  templateUrl: './g-text.input.html',
  styleUrls: ['./g-text.input.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GTextInput),
      multi: true
    }
  ]
})
export class GTextInput implements ControlValueAccessor {
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() validation: boolean = false;
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;
  @Input() minLength: number = 0;
  @Input() maxLength: number = 255;
  @Input() label: string = '';
  
  @Output() valueChange = new EventEmitter<string>();

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.value = newValue;
    this.onChange(newValue);
    this.valueChange.emit(newValue);
  }
}
