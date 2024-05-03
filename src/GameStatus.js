import { useEffect, useState } from 'react';
import { shufflePictures } from './Pictures';

export class GameState {
  static NotStarted = new GameState('Not started');
  static Run = new GameState('Run');
  static Pause = new GameState('Paused');
  static Win = new GameState('Win');
  static Lose = new GameState('Lose');

  constructor(name) {
    this.name = name;
  }

  toString() {
    return `GameState.${this.name}`;
  }

  stateToString() {
    return this.name;
  }
}

export const GameStatus = () => {
  const newGame = (pictures) => {
    return {
      pictures: pictures,
      picturesLeft: new Set(pictures.map((pic) => pic.getId())),
      markedPictures: new Set(),
      score: 0,
      state: GameState.NotStarted,
    };
  };
  const [data, setData] = useState(newGame([]));

  const getPictures = () => {
    return data.pictures;
  };

  const setNewGame = (pictures) => {
    let new_data = newGame(pictures);
    setData(new_data);
  };

  const getScore = () => {
    return data.score;
  };

  const getState = () => {
    return data.state;
  };

  const start = () => {
    if (data.state == GameState.NotStarted || data.state == GameState.Pause) {
      setData({ ...data, state: GameState.Run });
    }
  };

  const pause = () => {
    if (data.state == GameState.Run) {
      setData({ ...data, state: GameState.Pause });
    }
  };

  const isEnd = () => {
    return data.state == GameState.Win || data.state == GameState.Lose;
  };

  const markPicture = (picture) => {
    if (data.state != GameState.Run) {
      throw new Error(`Can't make move, game is ${data.state.stateToString()}`);
    }

    const id = picture.getId();
    if (data.picturesLeft.has(id)) {
      setData({
        ...data,
        pictures: shufflePictures(data.pictures),
        score: data.score + 1,
        markedPictures: new Set(data.markedPictures).add(id),
        picturesLeft: new Set(data.picturesLeft).delate(id),
        state: data.picturesLeft.length == 1 ? GameState.Win : data.state,
      });
    } else if (data.markedPictures.has(id)) {
      setData({ ...data, state: GameState.Lose });
    } else {
      throw new Error(
        `Invalid picture with id ${id} clicked. This id is not in the game.`
      );
    }
    return data.state;
  };

  return {
    start,
    pause,
    isEnd,
    markPicture,
    getScore,
    getState,
    newGame,
    setNewGame,
    getPictures,
  };
};
