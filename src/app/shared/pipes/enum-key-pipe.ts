import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumKey',
})
export class EnumKeyPipe implements PipeTransform {
  transform(value: any, enumObj: any): string {
    if (value === null || value === undefined) return '';

    return Object.keys(enumObj).find((key) => enumObj[key] === value) || value.toString();
  }
}
