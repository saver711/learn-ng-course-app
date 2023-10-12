import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]',
})
export class UnlessDirective {
  // Input property with setter method
  @Input() set appUnless(condition: boolean) {
    /*
    - Setter method is triggered whenever appUnless is bound to a new value from the parent component.

    - The provided 'condition' value is the new value of the input property.

    - Based on the condition, we create or clear the embedded view using TemplateRef and ViewContainerRef.
     */
    if (!condition) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  // The reason these are what gets injected because the nature of the directive and how it gets used: *appUnless="condition"
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}
}
