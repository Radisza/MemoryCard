export class GameState {
  static NotStarted = new GameState('Not started');
  static Run = new GameState('Running');
  static Pause = new GameState('Paused');
  static Win = new GameState('Won');
  static Lose = new GameState('Lost');

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
