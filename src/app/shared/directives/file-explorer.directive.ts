import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[fileExplorer]'
})
export class FileExplorerDirective {

  constructor(private ele: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
    const file = this.ele.nativeElement.querySelector('input');
    if (file) {
      this.renderer.setStyle(file, 'display', 'none');
    }
  }

  @HostListener('click') open() {
    const file = this.ele.nativeElement.querySelector('input');
    if (file) {
      file.click();
    }
  }
}
