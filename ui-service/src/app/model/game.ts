import {Platform} from './platform';

export class Game {
  id: number;
  longDescription: string;
  name: string;
  ranking: number;
  shortDescription: string;
  platform: Platform;
  coverUrl: string;
  checked?: boolean;


}
