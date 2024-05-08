import { useEffect, useState, useReducer } from 'react';
import { fetchNewPictures } from './Pictures';
import { Board } from './Board';
import { gameStatusReducer, initialGameStatus } from './GameStatus';
import './Game.css';
import {
  ImageTopics,
  NO_IMAGE_TOPIC,
  DEFAULT_IMAGE_TOPIC,
} from './ImageTopics';

const MIN_IMAGES_NUM = 10;
const IMAGES_LEVEL_RATIO = 5;

export function Game() {
  const [gameStatus, dispatch] = useReducer(
    gameStatusReducer,
    initialGameStatus([])
  );
  const [newPicturesOnChange, setNewPictures] = useState(true);
  const [imagesTopic, setImagesTopic] = useState(DEFAULT_IMAGE_TOPIC);

  useEffect(() => {
    async function newGame() {
      const btn = document.getElementById('newGameBtn');
      btn.disabled = true;
      const topic = imagesTopic == NO_IMAGE_TOPIC ? null : imagesTopic;
      const newPictures = await fetchNewPictures(
        MIN_IMAGES_NUM + IMAGES_LEVEL_RATIO * gameStatus.level,
        topic
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
  }, [gameStatus.level, newPicturesOnChange, imagesTopic]);

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

      <ImageTopics setImagesTopic={setImagesTopic} />
      <div> Images left: {gameStatus.picturesLeft.size} </div>
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
