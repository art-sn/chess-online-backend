import { Figure } from './a-Figure.model';
import { BoardState } from '../Board.model';

export class Bishop extends Figure {
  type = 'Bishop';
  canMove(board: BoardState, fromX: number, fromY: number, toX: number, toY: number) {
    if (!super.canMove(board, fromX, fromY, toX, toY)) return false;
    return this.canMoveByDiagonal(board, fromX, fromY, toX, toY);
  }
}
