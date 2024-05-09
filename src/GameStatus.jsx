import { GameState } from './GameState';
import { shufflePictures } from './Pictures';

const initialGameStatus = (pictures) => {
  return {
    pictures: shufflePictures(pictures),
    picturesLeft: new Set(pictures.map((pic) => pic.getId())),
    markedPictures: new Set(),
    state: GameState.Run,
    level: 0,
  };
};

function gameStatusReducer(gameStatus, action) {
  switch (action.type) {
    case 'newRound':
      return {
        ...initialGameStatus(action.pictures),
        level: gameStatus.level,
      };
    case 'finished':
      return (
        gameStatus.state == GameState.Win || gameStatus.state == GameState.Lose
      );
    case 'makeMove': {
      if (gameStatus.state != GameState.Run) {
        return gameStatus;
      }
      const id = action.pictureId;
      if (gameStatus.picturesLeft.has(id)) {
        let newLeft = new Set(gameStatus.picturesLeft);
        newLeft.delete(id);
        let newMarked = new Set(gameStatus.markedPictures);
        newMarked.add(id);
        return {
          ...gameStatus,
          pictures: shufflePictures(gameStatus.pictures),
          markedPictures: newMarked,
          picturesLeft: newLeft,
          state: newLeft.size == 0 ? GameState.Win : gameStatus.state,
        };
      } else if (gameStatus.markedPictures.has(id)) {
        return {
          ...gameStatus,
          state: GameState.Lose,
        };
      }
      throw new Error(`Unknown picture id ${id} clicked.`);
    }
    case 'newLevel':
      return {
        ...gameStatus,
        level: action.level,
      };

    default:
      throw new Error(`Unknown action ${action.type}`);
  }
}

export { initialGameStatus, gameStatusReducer };
