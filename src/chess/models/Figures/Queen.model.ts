import { Figure } from './a-Figure.model';
import { BoardState } from '../Board.model';

export class Queen extends Figure {
  type = 'Queen';

  canMove(board: BoardState, fromX: number, fromY: number, toX: number, toY: number) {
    if (!super.canMove(board, fromX, fromY, toX, toY)) return false;
    return (
      this.canMoveByVertical(board, fromX, fromY, toX, toY) ||
      this.canMoveByHorizontal(board, fromX, fromY, toX, toY) ||
      this.canMoveByDiagonal(board, fromX, fromY, toX, toY)
    );
  }
}
