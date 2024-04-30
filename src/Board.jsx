import PropTypes from 'prop-types';

function Board({ pictures }) {
  return (
    <>
      <div className="board">
        {pictures.map((pic) => {
          return (
            <img
              crossOrigin="anonymous"
              key={pic.getUrl()}
              className="card"
              src={pic.getUrl()}
            />
          );
        })}
      </div>
    </>
  );
}

Board.propTypes = {
  pictures: PropTypes.array.isRequired,
};

export default Board;
