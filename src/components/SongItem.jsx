const SongItem = ({ id, title, artist, currentPlaying }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl my-4">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{artist}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => currentPlaying(id)}
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongItem;
