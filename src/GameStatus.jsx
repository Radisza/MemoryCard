import { GameState } from './GameState';
import { shufflePictures } from './Pictures';

const initialGameStatus = (pictures) => {
  return {
    pictures: pictures,
    picturesLeft: new Set(pictures.map((pic) => pic.getId())),
    markedPictures: new Set(),
    score: 0,
    state: GameState.NotStarted,
  };
};

function gameStatusReducer(gameStatus, action) {
  switch (action.type) {
    case 'new':
      return initialGameStatus(action.pictures);
    case 'shuffle':
      return {
        ...gameStatus,
        pictures: shufflePictures(gameStatus.pictures),
      };
    case 'start':
      return {
        ...gameStatus,
        state: GameState.Run,
      };
    default:
      throw Error(`Unknown action ${action.type}`);
  }
}

export { initialGameStatus, gameStatusReducer };
