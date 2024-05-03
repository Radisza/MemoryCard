import { useEffect, useState, useCallback } from 'react';
import { fetchNewPictures, shufflePictures } from './Pictures';
import { Board } from './Board';
import { GameState } from './GameStatus';
import './Game.css';

function newGame() {}

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

  useEffect(() => {
    let ignore = false;

    const fetchFn = async () => {
      const newPictures = await fetchNewPictures(10);
      if (!ignore) {
        setGameStatus(newGameStatus(newPictures));
      }
    };

    fetchFn();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
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
