const picture = (data) => {
  const getId = () => {
    return data.id;
  };
  const getUrl = () => {
    return data.urls.thumb;
  };

  return {
    getId,
    getUrl,
  };
};

function loadImage(data) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = data.urls.raw;
    img.key = data.id;
    return img;
  });
}

async function fetchNewPictures(number, query) {
  const key = import.meta.env.VITE_UNSPLASH_KEY;
  let data = null;
  let url = `https://api.unsplash.com/photos/random?count=${number}&client_id=${key}`;
  if (query) {
    url += `&query=${query}`;
  }
  try {
    data = await fetch(url, {
      mode: 'cors',
    });
  } catch (error) {
    console.log(`Downloat failed with error ${error}`);
    return;
  }
  data = await data.json();

  let pictures = [];
  let promises = [];
  for (const pic of data) {
    pictures.push(picture(pic));
    promises.push(loadImage(pic));
  }

  await Promise.all(promises);
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
