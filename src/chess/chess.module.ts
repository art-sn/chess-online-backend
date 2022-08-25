import { Module } from '@nestjs/common';
import { ChessService } from './chess.service';
import { Board, BOARD_INJECTION_TOKEN } from './models/Board.model';

@Module({
  providers: [
    ChessService,
    {
      provide: BOARD_INJECTION_TOKEN,
      useClass: Board,
    },
  ],
})
export class ChessModule {}
