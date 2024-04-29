import { useState } from 'react';
import './Game.css';

async function fetchPictures(number) {
  const key = import.meta.env.VITE_UNSPLASH_KEY;
  let data = null;
  try {
    data = await fetch(
      `https://api.unsplash.com/photos/random?count=${number}&client_id=${key}`,
      {
        mode: 'cors',
      }
    );
  } catch (error) {
    console.log(`Downloat failed with error ${error}`);
    return;
  }
  const pictures = await data.json();

  console.log('FETCH END');
  console.log(pictures);
  return pictures;
}

function Board() {
  const [pictures, setPictures] = useState([]);

  const updatePictures = async () => {
    const pictures = await fetchPictures(10);
    setPictures(pictures);
  };

  console.log(pictures);
  const cards = [];
  for (const pic of pictures) {
    console.log(pic);
    cards.push(
      <img
        crossOrigin="anonymous"
        key={pic.urls.raw}
        className="card"
        src={pic.urls.raw}
      />
    );
  }

  return (
    <>
      <button onClick={updatePictures}> New board </button>
      <div className="board">{cards}</div>
    </>
  );
}

export { Board };
