import {Offer} from './offer';
import {Game} from './game';

export class ExchangeOffer {
  id: number;
  sourceOffer: Offer;
  accountId: number;
  accountName: string;
  commentary: string;
  offeredGames: Game[];
}
