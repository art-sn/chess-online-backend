import { Figure } from './Figures/a-Figure.model';
import { Colors } from '../enums/Colors.enum';
import { Pawn } from './Figures/Pawn.model';
import { King } from './Figures/King.model';
import { Bishop } from './Figures/Bishop.model';
import { Queen } from './Figures/Queen.model';
import { Rook } from './Figures/Rook.model';
import { Knight } from './Figures/Knight.model';
import { MovementDTO } from '../dto/Movement.dto';

export const BOARD_INJECTION_TOKEN = 'BOARD_INJECTION_TOKEN';

export type BoardState = (null | Figure)[][];

export class Board {
  readonly BOARD_LENGTH = 8;

  private state: BoardState;
  currentPlayerColor: Colors;

  constructor() {
    this.initializeBoard();
    this.currentPlayerColor = Colors.White;
  }

  public getState() {
    return this.state;
  }

  switchCurrentPlayer() {
    this.currentPlayerColor =
      this.currentPlayerColor === Colors.White ? Colors.Black : Colors.White;
  }

  makeMove(playerColor: Colors, move: MovementDTO) {
    const [fromX, fromY] = move.from;
    const [toX, toY] = move.to;

    if (this.currentPlayerColor !== playerColor) throw Error('Not your turn');
    const figure = this.state[fromY][fromX];
    if (!figure) throw Error('No figure at this position');
    if (figure.color !== playerColor) throw Error("You can not move opponent's figure");
    const boardState = this.getState();
    const canFigureMakeMove = figure.canMove(boardState, fromX, fromY, toX, toY);
    if (!canFigureMakeMove) throw Error('Figure cannot move to this position');
    this.state[fromY][fromX] = null;
    this.state[toY][toX] = figure;
    this.switchCurrentPlayer();
  }

  private initializeBoard() {
    this.state = new Array(this.BOARD_LENGTH);
    for (let y = 0; y < this.BOARD_LENGTH; y++) {
      this.state[y] = new Array(this.BOARD_LENGTH);
      for (let x = 0; x < this.BOARD_LENGTH; x++) {
        this.state[y][x] = null;
      }
    }
    this.addPawnsToStartPositions();
    this.addKnightsToStartPositions();
    this.addKingsToStartPositions();
    this.addBishopsToStartPositions();
    this.addQueensToStartPositions();
    this.addRooksToStartPositions();
  }

  private addPawnsToStartPositions() {
    const blackPawnsY = 1;
    const whitePawnsY = this.BOARD_LENGTH - 2;
    for (let x = 0; x < this.BOARD_LENGTH; x++) {
      this.state[blackPawnsY][x] = new Pawn(Colors.Black);
      this.state[whitePawnsY][x] = new Pawn(Colors.White);
    }
  }

  private addKnightsToStartPositions() {
    const firstBishopPositionX = 1;
    const secondBishopPositionX = 6;
    const whiteBishopPositionY = 7;
    const blackBishopPositionY = 0;
    this.state[whiteBishopPositionY][firstBishopPositionX] = new Knight(Colors.White);
    this.state[whiteBishopPositionY][secondBishopPositionX] = new Knight(Colors.White);
    this.state[blackBishopPositionY][firstBishopPositionX] = new Knight(Colors.Black);

    this.state[blackBishopPositionY][secondBishopPositionX] = new Knight(Colors.Black);
  }

  private addKingsToStartPositions() {
    const kingsPositionX = 4;
    const whiteKingPositionY = 7;
    const blackKingPositionY = 0;
    this.state[whiteKingPositionY][kingsPositionX] = new King(Colors.White);
    this.state[blackKingPositionY][kingsPositionX] = new King(Colors.Black);
  }

  private addBishopsToStartPositions() {
    const firstBishopPositionX = 2;
    const secondBishopPositionX = 5;
    const whiteBishopPositionY = 7;
    const blackBishopPositionY = 0;
    this.state[whiteBishopPositionY][firstBishopPositionX] = new Bishop(Colors.White);
    this.state[whiteBishopPositionY][secondBishopPositionX] = new Bishop(Colors.White);
    this.state[blackBishopPositionY][firstBishopPositionX] = new Bishop(Colors.Black);
    this.state[blackBishopPositionY][secondBishopPositionX] = new Bishop(Colors.Black);
  }

  private addQueensToStartPositions() {
    const queensPositionX = 3;
    const whiteQueenPositionY = 7;
    const blackQueenPositionY = 0;
    this.state[whiteQueenPositionY][queensPositionX] = new Queen(Colors.White);
    this.state[blackQueenPositionY][queensPositionX] = new Queen(Colors.Black);
  }

  private addRooksToStartPositions() {
    const firstRookPositionX = 0;
    const secondRookPositionX = 7;
    const whiteRookPositionY = 7;
    const blackRookPositionY = 0;
    this.state[whiteRookPositionY][firstRookPositionX] = new Rook(Colors.White);
    this.state[whiteRookPositionY][secondRookPositionX] = new Rook(Colors.White);
    this.state[blackRookPositionY][firstRookPositionX] = new Rook(Colors.Black);
    this.state[blackRookPositionY][secondRookPositionX] = new Rook(Colors.Black);
  }
}
