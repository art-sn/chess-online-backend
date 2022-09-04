import { Module } from '@nestjs/common';
import { ChessModule } from './chess/chess.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ChessModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env'],
    }),
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
