import {Offer} from './offer';
import {Game} from './game';

export class ExchangeOffer {
  id: number;
  sourceOffer: Offer;
  accountId: number;
  commentary: string;
  offeredGames: Game[];
}
