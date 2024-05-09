import PropTypes from 'prop-types';
import { GameState } from './GameState';

const ClickableImageList = ({ images, onCardClick }) => {
  return images.map((img) => {
    return (
      <img
        key={img.getId()}
        className="card"
        src={img.getUrl()}
        onClick={() => onCardClick(img.getId())}
      />
    );
  });
};

const MarkedImageList = ({ images, idsToMark }) => {
  return images.map((img) => {
    const classes = idsToMark.has(img.getId()) ? 'card markedCard' : 'card';
    return <img key={img.getId()} className={classes} src={img.getUrl()} />;
  });
};

export function Board({
  gameStatus,
  onCardClick,
  nextLvlCallback,
  sameLevelCallback,
  loading,
}) {
  if (loading) {
    return <div className="board">Loading images...</div>;
  }
  switch (gameStatus.state) {
    case GameState.Run:
      return (
        <div className="board">
          <ClickableImageList
            images={gameStatus.pictures}
            onCardClick={onCardClick}
          />
        </div>
      );
    case GameState.Lose:
      return (
        <div className="board">
          <MarkedImageList
            images={gameStatus.pictures}
            idsToMark={gameStatus.markedPictures}
          />
        </div>
      );
    case GameState.Win:
      return (
        <div className="board">
          <div>You win!</div>
          <div>
            <button onClick={nextLvlCallback}>Go to next level</button>
            <button onClick={sameLevelCallback}>
              Continue on the same level
            </button>
          </div>
        </div>
      );
  }
}

Board.propTypes = {
  gameStatus: PropTypes.object.isRequired,
  onCardClick: PropTypes.func.isRequired,
  nextLvlCallback: PropTypes.func.isRequired,
  sameLevelCallback: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
