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

export { Board };
