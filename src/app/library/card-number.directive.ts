import { Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appCardNumber]'
})
export class CardNumberDirective {

  private regex: RegExp = new RegExp(/^-?[0-9 ]+(\.[0-9]*){0,1}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-'];

  constructor(private element: ElementRef) {}
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.element.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }else{
      if (current.length == 4){
        current += " ";
      } else if (current.length == 9){
        current += " ";
      } else if (current.length == 14){
        current += " ";
      }
      this.element.nativeElement.value = current;
    }
  }
}
