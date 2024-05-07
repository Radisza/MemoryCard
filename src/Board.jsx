import PropTypes from 'prop-types';

export function Board({ pictures, onCardClick }) {
  return (
    <>
      <div className="board">
        {pictures.map((pic) => {
          return (
            <img
              key={pic.getId()}
              className="card"
              src={pic.getUrl()}
              onClick={() => onCardClick(pic.getId())}
            />
          );
        })}
      </div>
    </>
  );
}

Board.propTypes = {
  pictures: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
};
