import { useEffect, useState, useReducer } from 'react';
import { fetchNewPictures } from './Pictures';
import { Board } from './Board';
import { gameStatusReducer, initialGameStatus } from './GameStatus';
import './Game.css';

export function Game() {
  const [gameStatus, dispatch] = useReducer(
    gameStatusReducer,
    initialGameStatus([])
  );
  const [newGameOnChange, setNewGame] = useState(true);

  useEffect(() => {
    async function newGame() {
      const btn = document.getElementById('newGameBtn');
      btn.disabled = true;
      const newPictures = await fetchNewPictures(10);
      if (!ignore) {
        dispatch({
          type: 'new',
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
  }, [newGameOnChange]);

  const handleNewGame = () => setNewGame(!newGameOnChange);
  function handleResetGame() {
    dispatch({
      type: 'new',
      pictures: gameStatus.pictures,
    });
  }
  return (
    <>
      <button id="newGameBtn" onClick={handleNewGame}>
        New game
      </button>
      <button onClick={handleResetGame}>Reset</button>
      <div> Score: {gameStatus.score} </div>
      <div> Game state: {gameStatus.state.stateToString()} </div>
      <Board
        gameStatus={gameStatus}
        onCardClick={(pictureId) =>
          dispatch({ type: 'makeMove', pictureId: pictureId })
        }
      />
    </>
  );
}
