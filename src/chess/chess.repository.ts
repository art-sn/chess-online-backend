import { Injectable } from '@nestjs/common';
import { Board } from './models/Board.model';

@Injectable()
export class ChessRepository {
  board = null;

  constructor(private Board: Board) {}

  createDefaultBoard() {
    this.board = new Board();
  }
}
