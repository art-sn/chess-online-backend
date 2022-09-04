import { BoardState } from '../Board.model';
import { Colors } from '../../enums/Colors.enum';

export abstract class Figure {
  type: string;

  constructor(public color: Colors) {}

  canMove(board: BoardState, fromX: number, fromY: number, toX: number, toY: number) {
    const targetFigure = board[toY][toX];
    if (targetFigure?.color === this.color) return false;
    return true;
  }

  moveMade(board: BoardState, fromX: number, fromY: number, toX: number, toY: number): void {}

  protected canMoveByVertical(
    board: BoardState,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
  ) {
    if (fromX !== toX) {
      return false;
    }

    const [lowerCell, upperCell] = [fromY, toY].sort((a, b) => a - b);
    for (let y = lowerCell + 1; y < upperCell; y++) {
      const figureAtThisPositionExists = Boolean(board[y][toX]);
      if (figureAtThisPositionExists) {
        return false;
      }
    }
    return true;
  }

  protected canMoveByHorizontal(
    board: BoardState,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
  ) {
    if (fromY !== toY) {
      return false;
    }

    const [leftCell, RightCell] = [fromX, toX].sort((a, b) => a - b);
    for (let x = leftCell + 1; x < RightCell; x++) {
      const figureAtThisPositionExists = Boolean(board[toY][x]);
      if (figureAtThisPositionExists) {
        return false;
      }
    }
    return true;
  }

  protected canMoveByDiagonal(
    board: BoardState,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
  ) {
    const absX = Math.abs(fromX - toX);
    const absY = Math.abs(fromY - toY);
    if (absY !== absX) return false;

    const sideMovingY = fromY < toY ? 1 : -1;
    const sideMovingX = fromX < toX ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      // figure at i positions higher/lower and i positions left/right from start positions
      const figureAtThisPositionExists = Boolean(
        board[fromY + sideMovingY * i][fromX + sideMovingX * i],
      );
      if (figureAtThisPositionExists) return false;
    }
    return true;
  }
}
