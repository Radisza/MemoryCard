const picture = (data) => {
  const getId = () => {
    return data.id;
  };
  const getUrl = () => {
    return data.urls.raw;
  };

  return {
    getId,
    getUrl,
  };
};

async function fetchNewPictures(number) {
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
  data = await data.json();

  console.log('FETCHED');
  console.log(data);

  let pictures = [];
  for (const pic of data) {
    pictures.push(picture(pic));
  }

  return pictures;
}

function shufflePictures(pictures) {
  let pics = [...pictures];
  let currIdx = pics.length - 1;

  while (currIdx >= 0) {
    // get random index [0..curr_idx] and add swap them
    const randomIdx = Math.floor(Math.random() * (currIdx + 1));
    [pics[randomIdx], pics[currIdx]] = [pics[currIdx], pics[randomIdx]];
    currIdx--;
  }

  return pics;
}

export { fetchNewPictures, shufflePictures };
