/**
 * Created by nick on 10/17/17.
 */
import {Pipe, PipeTransform} from '@angular/core';
import {City} from '../models/City';

@Pipe({
  name: 'searchZip',
  pure: false
})
export class searchZip implements PipeTransform {
  transform(value: City[], filter: string): City[] {
    filter = filter ? filter.toLocaleLowerCase() : '';
    return filter && value ?
      value.filter(city =>
        (city.zip.toString().toLocaleLowerCase().indexOf(filter) !== -1)
      ) :
      value;
  }
}
@Pipe({
  name: 'searchName',
  pure: false
})
export class searchName implements PipeTransform {
  transform(value: City[], filter: string): City[] {
    filter = filter ? filter.toLocaleLowerCase() : '';
    return filter && value ?
      value.filter(city =>
        (city.name.toLocaleLowerCase().indexOf(filter) !== -1)
      ) :
      value;
  }
}
@Pipe({
  name: 'searchMultiplePipe',
  pure:false
})
export class searchMultiplePipe implements PipeTransform {
  transform(value: City[], filter: string): City[] {
    filter = filter ? filter.toLocaleLowerCase() : '';
    return filter && value ?
      value.filter(city =>
        (city.name.toLocaleLowerCase().indexOf(filter) !== -1) ||
        (city.zip.toString().toLocaleLowerCase().indexOf(filter) !== -1)
      ) :
      value;
  }
}
