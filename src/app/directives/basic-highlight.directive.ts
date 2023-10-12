import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  // must be unique
  selector: '[appBasicHighlight]',
})
export class BasicHighlightDirective implements OnInit {
  // angular gives us access to the element this directive is placed on
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}

