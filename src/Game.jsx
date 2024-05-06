import { useEffect, useState, useCallback } from 'react';
import { fetchNewPictures, shufflePictures } from './Pictures';
import { Board } from './Board';
import { GameState } from './GameStatus';
import './Game.css';

export function Game() {
  const newGameStatus = (pictures) => {
    return {
      pictures: pictures,
      picturesLeft: new Set(pictures.map((pic) => pic.getId())),
      markedPictures: new Set(),
      score: 0,
      state: GameState.NotStarted,
    };
  };
  const [gameStatus, setGameStatus] = useState(newGameStatus([]));
  const [newGameOnChange, setNewGame] = useState(true);

  useEffect(() => {
    async function newGame() {
      const btn = document.getElementById('newGameBtn');
      btn.disabled = true;
      const newPictures = await fetchNewPictures(10);
      if (!ignore) {
        setGameStatus(newGameStatus(newPictures));
        btn.disabled = false;
      }
    }
    let ignore = false;
    newGame();

    return () => {
      ignore = true;
    };
  }, [newGameOnChange]);

  return (
    <>
      <button
        id="newGameBtn"
        onClick={() => {
          setNewGame(!newGameOnChange);
        }}
      >
        New game
      </button>
      <button onClick={gameStatus.start}> Start game </button>
      <Board
        pictures={gameStatus.pictures}
        onCardClick={() => {
          const new_images = shufflePictures(gameStatus.pictures);
          setGameStatus({ ...gameStatus, pictures: new_images });
        }}
      />
    </>
  );
}
