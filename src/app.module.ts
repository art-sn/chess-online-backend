import { Module } from '@nestjs/common';
import { ChessModule } from './chess/chess.module';
@Module({
  imports: [ChessModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
