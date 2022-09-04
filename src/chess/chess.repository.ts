import { Inject, Injectable } from '@nestjs/common';
import { Board, BOARD_INJECTION_TOKEN } from './models/Board.model';

@Injectable()
export class ChessRepository {
  private board: null | Board = null;

  constructor(@Inject(BOARD_INJECTION_TOKEN) private Board: Board) {}

  createDefaultBoard() {
    this.board = new Board();
    return this.board;
  }

  stopGame() {
    this.board = null;
  }

  getBoard() {
    return this.board;
  }
}
