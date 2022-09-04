import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChessService } from './chess.service';
import { MovementDTO } from './dto/Movement.dto';
import { Nullable } from '../shared/types/Nullable.type';
import { Colors } from './enums/Colors.enum';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { BusinessError } from '../shared/errors/BusinessError';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    exceptionFactory: (errors) => new WsException(errors),
  }),
)
@WebSocketGateway({ cors: true })
export class ChessGateway implements OnGatewayConnection, OnGatewayDisconnect {
  gameStarted = false;
  player1: Nullable<Socket> = null;
  player2: Nullable<Socket> = null;

  @WebSocketServer()
  server: Server;

  constructor(private chessService: ChessService) {}

  //todo MATCHMAKING SERVICE
  handleConnection(client: Socket) {
    if (this.gameStarted) {
      client.join('game');
      const boardState = this.chessService.getBoardState();
      if (boardState) client.emit('initialize_board', boardState);
      return;
    }
    if (!this.player1) {
      this.player1 = client;
      return;
    }
    this.player2 = client;
    this.gameStarted = true;
    this.player2.join('game');
    this.player1.join('game');
    const boardInitialState = this.chessService.startGame();
    this.server.to('game').emit('initialize_board', boardInitialState);
  }

  handleDisconnect(client: Socket) {
    if (client === this.player1 || client === this.player2) {
      this.chessService.endGame();
      this.player1?.disconnect();
      this.player2?.disconnect();
      this.gameStarted = false;
      this.player1 = null;
      this.player2 = null;
    }
  }

  @SubscribeMessage('move')
  handleMove(client: Socket, dto: MovementDTO) {
    if (!this.gameStarted) client.emit('error', 'Game has not started yet');
    if (client !== this.player1 && client !== this.player2) {
      client.emit('error', 'You are not allowed to make moves');
      return;
    }
    const playerColor = client === this.player1 ? Colors.White : Colors.Black;

    try {
      this.chessService.makeMove(playerColor, dto);
      this.server.to('game').emit('move_made', dto);
    } catch (e) {
      if (e instanceof BusinessError) {
        throw new WsException(e.message);
      }
      throw new WsException('Something went wrong');
    }
  }
}
