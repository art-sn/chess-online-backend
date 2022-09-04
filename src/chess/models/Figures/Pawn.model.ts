import { Figure } from './a-Figure.model';
import { Colors } from '../../enums/Colors.enum';
import { BoardState } from '../Board.model';

export class Pawn extends Figure {
  type = 'Pawn';
  private isFirstStep = true;

  moveMade(board: BoardState, fromX: number, fromY: number, toX: number, toY: number) {
    if (!this.isFirstStep) this.isFirstStep = true;
  }

  canMove(board: BoardState, fromX: number, fromY: number, toX: number, toY: number): boolean {
    if (!super.canMove(board, fromX, fromY, toX, toY)) {
      return false;
    }

    const direction = this.color === Colors.Black ? 1 : -1;
    const firstStepDirection = this.color === Colors.Black ? 2 : -2;

    if (fromX === toX) {
      if (board[toY][toX]) return false;
      if (toY === fromY + direction) return true;
      if (this.isFirstStep && toY === fromY + firstStepDirection) return true;
    } else {
      if (Math.abs(fromX - toX) > 1) return false;

      if (toY === fromY + direction && board[toY][toX]) return true;
    }

    return false;
  }
}
