import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'absoluteUrl' })
export class AbsoluteUrlPipe implements PipeTransform {
  transform(url: string): string {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'http://' + url;
    }
    return url;
  }
}