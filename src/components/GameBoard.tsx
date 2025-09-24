import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
  const [gameBoard, setGameBoard] =
    useState<(string | null)[][]>(initialGameBoard);

  function handleSelectSquare(
    selectedRowIndex: number,
    selectedColIndex: number
  ) {
    setGameBoard((prevGameBoard) => [
      ...prevGameBoard.map((row, rowIndex) => [
        ...row.map((col, colIndex) =>
          rowIndex == selectedRowIndex && colIndex == selectedColIndex
            ? "X"
            : col
        ),
      ]),
    ]);
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
