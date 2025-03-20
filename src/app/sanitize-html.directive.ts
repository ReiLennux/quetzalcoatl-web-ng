import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appSanitizeHtml]'
})
export class SanitizeHtmlDirective implements OnChanges {
  @Input() set sanitizeHtml(content: string) {
    const sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(content);
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', sanitizedContent);
  }

  constructor(
    private sanitizer: DomSanitizer,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnChanges(): void {
    const sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.el.nativeElement.innerHTML);
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', sanitizedContent);
  }
}
