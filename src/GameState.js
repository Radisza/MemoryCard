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
