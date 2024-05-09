import { useEffect, useState, useReducer } from 'react';
import { fetchNewPictures } from './Pictures';
import { Board } from './Board';
import { gameStatusReducer, initialGameStatus } from './GameStatus';
import './Game.css';
import { NO_IMAGE_TOPIC, DEFAULT_IMAGE_TOPIC } from './ImageTopics';
import { UserPanel } from './UserPanel';
import { StatsPanel } from './StatsPanel';

const MIN_IMAGES_NUM = 5;
const IMAGES_LEVEL_RATIO = 5;

export function Game() {
  const [gameStatus, dispatch] = useReducer(
    gameStatusReducer,
    initialGameStatus([])
  );
  const [newPicturesOnChange, setNewPictures] = useState(true);
  const [imagesTopic, setImagesTopic] = useState(DEFAULT_IMAGE_TOPIC);
  const [fetchingPictures, setFetching] = useState(false);

  useEffect(() => {
    async function newGame() {
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
        setFetching(false);
      }
    }
    let ignore = false;
    setFetching(true);
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
    if (newLvl != gameStatus.level) {
      dispatch({
        type: 'newLevel',
        level: newLvl,
      });
    } else {
      handleNewImages();
    }
  }
  return (
    <div className="gamePage">
      <div className="gamePanel">
        <UserPanel
          setNewLevel={handleNewLevel}
          fetchNewImages={handleNewImages}
          resetRound={handleResetRound}
          setImagesTopic={setImagesTopic}
          loading={fetchingPictures}
        />
        <StatsPanel gameStatus={gameStatus} />
      </div>
      <Board
        gameStatus={gameStatus}
        onCardClick={(pictureId) =>
          dispatch({ type: 'makeMove', pictureId: pictureId })
        }
        nextLvlCallback={() => {
          handleNewLevel(gameStatus.level + 1);
        }}
        sameLevelCallback={handleNewImages}
        loading={fetchingPictures}
      />
    </div>
  );
}
