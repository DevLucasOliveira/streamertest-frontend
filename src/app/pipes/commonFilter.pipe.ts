import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commonFilter'
})
export class CommonFilterPipe implements PipeTransform {
  transform(items: any[], term: string): any {
    if (items && term != '')
      return items.filter((item: any) => item.name.toLowerCase().includes(term.toLowerCase()));
    else
      return items;
  }
}
