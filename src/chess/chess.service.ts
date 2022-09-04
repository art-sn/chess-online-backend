import { Injectable } from '@nestjs/common';
import { ChessRepository } from './chess.repository';
import { MovementDTO } from './dto/Movement.dto';
import { Colors } from './enums/Colors.enum';
import { BusinessError } from '../shared/errors/BusinessError';

@Injectable()
export class ChessService {
  constructor(private chessRepository: ChessRepository) {}

  startGame() {
    const board = this.chessRepository.createDefaultBoard();
    return board.getState();
  }

  endGame() {
    this.chessRepository.stopGame();
  }

  getBoardState() {
    return this.chessRepository.getBoard()?.getState();
  }

  makeMove(playerColor: Colors, dto: MovementDTO) {
    const board = this.chessRepository.getBoard();
    if (!board) throw new BusinessError('game has not been started yet');

    try {
      board.makeMove(playerColor, dto);
    } catch (e: any) {
      console.log(e);
      throw new BusinessError(e.message);
    }
  }
}
