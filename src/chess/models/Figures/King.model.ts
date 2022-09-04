import { Figure } from './a-Figure.model';
import { BoardState } from '../Board.model';

export class King extends Figure {
  type = 'King';

  canMove(board: BoardState, fromX: number, fromY: number, toX: number, toY: number) {
    if (!super.canMove(board, fromX, fromY, toX, toY)) return false;
    if (Math.abs(fromX - toX) > 1 || Math.abs(fromY - toY) > 1) return false;

    return (
      this.canMoveByVertical(board, fromX, fromY, toX, toY) ||
      this.canMoveByHorizontal(board, fromX, fromY, toX, toY) ||
      this.canMoveByDiagonal(board, fromX, fromY, toX, toY)
    );
  }
}
