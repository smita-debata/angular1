import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'landlord'
})
export class LandlordPipe implements PipeTransform {

  transform(items: any, keyword: string): any[] {
    if (!items || !keyword) {
      return items;
    }

    keyword = keyword.toLowerCase();

    return items.filter((item: any) => {
      if (typeof item === 'object') {
        for (const key in item) {
          if (item.hasOwnProperty(key) && typeof item[key] === 'string') {
            if (item[key].toLowerCase().includes(keyword)) {
              return true;
            }
          }
        }
      }
      return false;
    });

  }
}
