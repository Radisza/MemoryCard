import PropTypes from 'prop-types';
import { GameState } from './GameState';

const ClickableImageList = (images, onCardClick) => {
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

const MarkedImageList = (images, idsToMark) => {
  return images.map((img) => {
    const classes = idsToMark.has(img.getId()) ? 'card markedCard' : 'card';
    return <img key={img.getId()} className={classes} src={img.getUrl()} />;
  });
};

export function Board({ gameStatus, onCardClick }) {
  let images = [];
  if (gameStatus.state == GameState.Run) {
    images = ClickableImageList(gameStatus.pictures, onCardClick);
  } else if (gameStatus.state == GameState.Lose) {
    images = MarkedImageList(gameStatus.pictures, gameStatus.markedPictures);
  }
  return (
    <>
      <div className="board">{images}</div>
    </>
  );
}

Board.propTypes = {
  gameStatus: PropTypes.object.isRequired,
  onCardClick: PropTypes.func.isRequired,
};
