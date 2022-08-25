import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChessGateway implements OnGatewayConnection {
  player1 = null;
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    if (!this.player1) {
      this.player1 = client.id;
      return;
    }
  }
}
