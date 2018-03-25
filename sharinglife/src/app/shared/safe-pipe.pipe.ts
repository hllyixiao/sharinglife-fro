import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safePipe'
})
export class SafePipePipe implements PipeTransform {
  constructor (private sanitizer: DomSanitizer) {}
  transform(content: any, args?: any): any {
    if (args === 'Html') {
      return this.sanitizer.bypassSecurityTrustHtml(content);
    }
    if (args === 'Script') {
      return this.sanitizer.bypassSecurityTrustScript(content);
    }
    if (args === 'Style') {
      return this.sanitizer.bypassSecurityTrustStyle(content);
    }
    if (args === 'Url') {
      return this.sanitizer.bypassSecurityTrustUrl(content);
    }
    if (args === 'ResourceUrl') {
      return this.sanitizer.bypassSecurityTrustResourceUrl(content);
    }
    return content;
  }

}
