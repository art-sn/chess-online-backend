import { Module } from '@nestjs/common';
import { ChessService } from './chess.service';
import { Board, BOARD_INJECTION_TOKEN } from './models/Board.model';
import { ChessRepository } from './chess.repository';
import { ChessGateway } from './chess.gateway';

@Module({
  providers: [
    ChessService,
    {
      provide: BOARD_INJECTION_TOKEN,
      useClass: Board,
    },
    ChessRepository,
    ChessGateway,
  ],
})
export class ChessModule {}
