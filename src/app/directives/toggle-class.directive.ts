import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appToggleClass]',
})
export class ToggleClassDirective implements OnInit {
  @Input() addThisClassName = '';
  exists!: boolean;

  @HostBinding('class')
  get classBinding() {
    //true?
    // if this.addThisClassName = 'text-white'
    // i will be binding to class.text-white
    return this.exists ? this.addThisClassName : '';
  }

  ngOnInit(): void {
    this.exists = this.elementRef.nativeElement.classList.contains(
      this.addThisClassName
    );
  }

  // @HostListener('click', ['$event'])
  // onClick() {
  //   this.exists = !this.exists;
  // }

  // remove class when clicking away, we don't need click event on the element ⬆⬆⬆⬆
  @HostListener('document:click', ['$event']) removeFromAway(
    event: MouseEvent
  ) {
    this.exists = this.elementRef.nativeElement.contains(event.target)
      ? !this.exists
      : false;
  }

  constructor(private elementRef: ElementRef) {}
}
