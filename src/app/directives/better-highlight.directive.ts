import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  HostListener,
  HostBinding,
  Input
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor = ''
  @Input() changingColor = ''
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  
  @HostBinding('style.backgroundColor') bcgColor = ''


  ngOnInit(): void {
    this.bcgColor = this.defaultColor
  }


  @HostListener('mouseenter', ['$event']) onMouseEnter(event: MouseEvent) {
    this.bcgColor = this.changingColor
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.bcgColor = this.defaultColor
  }
}