// sanitize-html.directive.ts
import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appSanitizeHtml]' // Se aplicará a cualquier elemento con esta directiva
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
    // Actualiza el contenido HTML cuando cambian las entradas
    const sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.el.nativeElement.innerHTML);
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', sanitizedContent);
  }
}
