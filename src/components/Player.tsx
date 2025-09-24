import React, { useState } from "react";

const Player: React.FC<{ initialName: string; symbol: string }> = ({
  initialName,
  symbol,
}) => {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    // best practice: pass a function into setState when updating based on the previous state
    // this is because react schedules state updates
    setIsEditing((editing) => !editing);
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPlayerName(event.target.value);
  }

  return (
    <li>
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
