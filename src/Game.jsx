import { useEffect, useState, useReducer } from 'react';
import { fetchNewPictures } from './Pictures';
import { Board } from './Board';
import { gameStatusReducer, initialGameStatus } from './GameStatus';
import './Game.css';

const MIN_IMAGES_NUM = 10;

export function Game() {
  const [gameStatus, dispatch] = useReducer(
    gameStatusReducer,
    initialGameStatus([])
  );
  const [newPicturesOnChange, setNewPictures] = useState(true);

  useEffect(() => {
    async function newGame() {
      const btn = document.getElementById('newGameBtn');
      btn.disabled = true;
      const newPictures = await fetchNewPictures(
        MIN_IMAGES_NUM + 5 * gameStatus.level
      );
      if (!ignore) {
        dispatch({
          type: 'newRound',
          pictures: newPictures,
        });
        btn.disabled = false;
      }
    }
    let ignore = false;
    newGame();

    return () => {
      ignore = true;
    };
  }, [gameStatus.level, newPicturesOnChange]);

  function handleResetRound() {
    dispatch({
      type: 'newRound',
      pictures: gameStatus.pictures,
    });
  }

  const handleNewImages = () => setNewPictures(!newPicturesOnChange);

  function handleNewLevel(newLvl) {
    dispatch({
      type: 'newLevel',
      level: newLvl,
    });
  }
  return (
    <>
      <button
        className="fetchBtn"
        id="newGameBtn"
        onClick={() => handleNewLevel(0)}
      >
        New game
      </button>
      <button className="fetchBtn" onClick={handleNewImages}>
        New images
      </button>
      <button className="fetchBtn" onClick={handleResetRound}>
        Reset round
      </button>

      <div> Score: {gameStatus.score} </div>
      <div> Game state: {gameStatus.state.stateToString()} </div>
      <div> Level: {gameStatus.level} </div>
      <Board
        gameStatus={gameStatus}
        onCardClick={(pictureId) =>
          dispatch({ type: 'makeMove', pictureId: pictureId })
        }
        nextLvlCallback={() => {
          handleNewLevel(gameStatus.level + 1);
        }}
        resetRoundCallback={handleResetRound}
      />
    </>
  );
}
