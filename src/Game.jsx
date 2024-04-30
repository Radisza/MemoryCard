import { Board } from './Board';
import { fetchNewPictures, shufflePictures } from './Pictures.js';
import { useState } from 'react';
import './Game.css';

export function Game() {
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

      <Board pictures={pictures} />
    </>
  );
}
