import React from "react";

export interface LogRow {
  square: { row: number; col: number };
  player: string;
}

const Log: React.FC<{ turns: LogRow[] }> = ({ turns }) => {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected ({turn.square.row}, {turn.square.col})
        </li>
      ))}
    </ol>
  );
};

export default Log;
