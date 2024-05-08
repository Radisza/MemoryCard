import PropTypes from 'prop-types';

export function StatsPanel({ gameStatus }) {
  return (
    <div className="statsPanel">
      <div>Game is {gameStatus.state.stateToString()}</div>
      <div>Level: {gameStatus.level}</div>
      <div>Images left: {gameStatus.picturesLeft.size}</div>
    </div>
  );
}

StatsPanel.propTypes = {
  gameStatus: PropTypes.object.isRequired,
};
