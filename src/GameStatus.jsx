import { GameState } from './GameState';
import { shufflePictures } from './Pictures';

const initialGameStatus = (pictures) => {
  return {
    pictures: shufflePictures(pictures),
    picturesLeft: new Set(pictures.map((pic) => pic.getId())),
    markedPictures: new Set(),
    score: 0,
    state: GameState.Run,
  };
};

function gameStatusReducer(gameStatus, action) {
  switch (action.type) {
    case 'new':
      return initialGameStatus(action.pictures);
    case 'finished':
      return (
        gameStatus.state == GameState.Win || gameStatus.state == GameState.Lose
      );
    case 'makeMove': {
      if (gameStatus.state != GameState.Run) {
        return gameStatus;
      }
      const id = action.pictureId;
      if (gameStatus.picturesLeft.delete(id)) {
        gameStatus.markedPictures.add(id);
        return {
          ...gameStatus,
          pictures: shufflePictures(gameStatus.pictures),
          score: gameStatus.score + 1,
          markedPictures: new Set(gameStatus.markedPictures),
          picturesLeft: new Set(gameStatus.picturesLeft),
          state:
            gameStatus.picturesLeft.size == 0
              ? GameState.Win
              : gameStatus.state,
        };
      } else if (gameStatus.markedPictures.has(id)) {
        return {
          ...gameStatus,
          state: GameState.Lose,
        };
      }
      throw new Error(`Unknown picture id ${id} clicked.`);
    }

    default:
      throw new Error(`Unknown action ${action.type}`);
  }
}

export { initialGameStatus, gameStatusReducer };
