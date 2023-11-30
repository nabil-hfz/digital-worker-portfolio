import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary',
})
export class SummaryPipe implements PipeTransform {

  transform(value: string, limit?: number): unknown {

    if (!value) return null;
    limit = limit ?? 50;
    return value.substring(0, limit ?? 50) + (limit < value.length ? '...' : '');
  }


}
