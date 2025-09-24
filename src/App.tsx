import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { LogRow } from "./components/Log";
import { WINNING_COMBINATIONS } from "./data/winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = { O: "Player 1", X: "Player 2" };

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns: LogRow[]) {
  let currentPlayer = "O";

  if (gameTurns[0] && gameTurns[0].player === "O") {
    currentPlayer = "X";
  }

  return currentPlayer;
}

function deriveWinner(
  gameBoard: (string | null)[][],
  players: { X: string; O: string }
) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol as keyof typeof players];
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns: LogRow[]) {
  let gameBoard: (string | null)[][] = [
    ...INITIAL_GAME_BOARD.map((array) => [...array]),
  ];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    if (gameBoard[row]) {
      gameBoard[row][col] = player;
    }
  }

  return gameBoard;
}

function App() {
  // want to manage as little state as possible, derive as much as possible
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState<LogRow[]>([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex: number, colIndex: number) {
    setGameTurns((prevTurns) => [
      {
        square: { row: rowIndex, col: colIndex },
        player: deriveActivePlayer(prevTurns),
      },
      ...prevTurns,
    ]);
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol: string, name: string) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: name };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver onRestart={handleRestart} winner={winner} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
