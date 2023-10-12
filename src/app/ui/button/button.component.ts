import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styles: [],
})
export class ButtonComponent {
  @Input() buttonText: string = 'Click me';
  @Input() buttonStyle: "primary" | "success" | "danger" = 'primary';
  @Input() type: "button" | "reset" | "submit" = 'button';
  @Input() disabled: boolean | null = false

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    this.buttonClick.emit();
  }
}
