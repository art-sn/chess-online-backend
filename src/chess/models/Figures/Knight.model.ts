import { Figure } from './a-Figure.model';
import { BoardState } from '../Board.model';

export class Knight extends Figure {
  type = 'Knight';

  canMove(board: BoardState, fromX: number, fromY: number, toX: number, toY: number) {
    if (!super.canMove(board, fromX, fromY, toX, toY)) return false;
    const sideMovingX = Math.abs(fromX - toX);
    const sideMovingY = Math.abs(fromY - toY);

    return (sideMovingX === 1 && sideMovingY === 2) || (sideMovingX === 2 && sideMovingY === 1);
  }
}
