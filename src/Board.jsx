import { useState } from 'react';
import { fetchNewPictures, shufflePictures } from './Pictures';
import './Game.css';

function Board() {
  const [pictures, setPictures] = useState([]);

  const updatePictures = async () => {
    const new_pictures = await fetchNewPictures(10);
    setPictures(new_pictures);
  };

  const handleShuffle = async () => {
    const new_pictures = shufflePictures(pictures);
    setPictures(new_pictures);
  };

  return (
    <>
      <button onClick={updatePictures}> New board </button>
      <button onClick={handleShuffle}> Shuffle pictures </button>

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

export { Board };
