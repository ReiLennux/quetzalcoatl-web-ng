import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeHtml'
})
export class DecodeHtmlPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const parser = new DOMParser();
    const decodedString = parser.parseFromString(value, 'text/html').body.textContent;
    
    return decodedString ?? value;
  }
}
