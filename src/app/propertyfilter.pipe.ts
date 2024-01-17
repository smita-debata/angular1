import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propertyfilter'
})
export class PropertyfilterPipe implements PipeTransform {

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
  // transform(items: any, keyword: string): any[] {
  //   if (!items || !keyword) {
  //     return items;
  //   }
  //   keyword = keyword.toLowerCase();
  //   return items.filter((item: any) => {
  //     if (item.hasOwnProperty('formattedAddress') || item.hasOwnProperty('city') || item.hasOwnProperty('state')) {
  //       return item.formattedAddress.toLowerCase().includes(keyword) || item.city.toLowerCase().includes(keyword) || item.state.toLowerCase().includes(keyword);

  //     }
  //     return false;
  //   });

  // }
  // transform(items: any[], searchedAddress: string): any[] {
  //   if (!items || !searchedAddress) {
  //     return items;
  //   }

  //   searchedAddress = searchedAddress.toLowerCase().replace(/\s/g, ''); // Remove spaces for comparison

  //   return items.filter(item => {
  //     const propertyAddress = `${item.address}, ${item.city}, ${item.state} ${item.zipCode}`;
  //     const formattedPropertyAddress = propertyAddress.toLowerCase().replace(/\s/g, '');

  //     return (
  //       formattedPropertyAddress.includes(searchedAddress) ||
  //       searchedAddress.includes(formattedPropertyAddress)
  //     );
  //   });
  // }
}


