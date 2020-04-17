import {Pipe, PipeTransform} from '@angular/core';
import {Game} from '../model/game';

@Pipe({name: 'pluck'})
export class NamePipe implements PipeTransform {
  transform(input: Game[]): any {
    return input.map(value => ' ' + value.name);
  }
}
