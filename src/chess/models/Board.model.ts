import { Figure } from './Figures/Figure.model';
import { Colors } from '../enums/Colors.enum';

export const BOARD_INJECTION_TOKEN = 'BOARD_INJECTION_TOKEN';

export class Board {
  state: Figure[][];
  whoseMove: Colors;

  constructor() {
    this.initializeBoard();
    this.whoseMove = Colors.White;
  }

  private initializeBoard() {}
}
