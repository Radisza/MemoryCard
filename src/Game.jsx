import { useEffect } from 'react';
import { GameStatus } from './GameStatus';
import { fetchNewPictures } from './Pictures';
import { Board } from './Board';

import './Game.css';

export function Game() {
  let gameStatus = GameStatus();

  const newGame = async () => {
    const newPictures = await fetchNewPictures(10);
    gameStatus.setNewGame(newPictures);
  };

  useEffect(() => {
    let ignore = false;

    const fetchFn = async () => {
      const newPictures = await fetchNewPictures(10);
      if (!ignore) {
        gameStatus.setNewGame(newPictures);
      }
    };
    fetchFn();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <button onClick={() => newGame()}> New game </button>
      <button onClick={gameStatus.start}> Start game </button>
      <Board
        pictures={gameStatus.getPictures()}
        onCardClick={gameStatus.markPicture}
      />
    </>
  );
}
