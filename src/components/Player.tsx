import React, { useState } from "react";

const Player: React.FC<{
  initialName: string;
  symbol: string;
  isActive: boolean;
  onChangeName: (symbol: string, name: string) => void;
}> = ({ initialName, symbol, isActive, onChangeName }) => {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    // best practice: pass a function into setState when updating based on the previous state
    // this is because react schedules state updates
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {/* two-way binding */}
        {isEditing && (
          <input
            type="text"
            required
            defaultValue={playerName}
            onChange={handleNameChange}
          />
        )}
        {!isEditing && <span className="player-name">{playerName}</span>}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>
        {isEditing && "Save"}
        {!isEditing && "Edit"}
      </button>
    </li>
  );
};

export default Player;
