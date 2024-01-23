import { useEffect, useState } from "react";
import { getSongAPI } from "../api/song";
import SongItem from "./SongItem";

const SongList = () => {
  const [songList, setSongList] = useState([]);
  const [currSong, setCurrSong] = useState([]);
  const [currSongIndex, setCurrSongIndex] = useState(0);
  const getSong = async () => {
    try {
      const response = await getSongAPI();
      setSongList(response?.data?.data);
      setCurrSong([response?.data?.data[0]]);
    } catch (error) {
      console.error(error);
    }
  };

  const currentPlaying = (id) => {
    const temp = songList.filter((song) => song.id === id);
    let index;
    for (let i = 0; i < songList.length; i++) {
      if (songList[i].id === temp[0].id) {
        index = i;
        break;
      }
    }
    setCurrSong(temp);
    setCurrSongIndex(index);
  };

  const changeSong = (type) => {
    let index;
    for (let i = 0; i < songList.length; i++) {
      if (songList[i].id === currSong[0].id) {
        index = i;
        break;
      }
    }
    if (type === "prev") {
      index = index === 0 ? songList.length - 1 : (index -= 1);
      setCurrSongIndex(index);
      setCurrSong([songList[index]]);
      return;
    }
    index = index === songList.length - 1 ? 0 : (index += 1);
    setCurrSongIndex(index);

    setCurrSong([songList[index]]);
  };

  const generateRandom = () => {
    var num = Math.floor(Math.random() * (songList.length - 1 - 0 + 1)) + 0;
    return num === currSongIndex ? generateRandom() : num;
  };

  const shuffle = () => {
    const index = generateRandom();
    setCurrSongIndex(index);
    setCurrSong([songList[index]]);
  };

  useEffect(() => {
    getSong();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-gray-200">
      <div className="flex flex-col items-center gap-4 fixed top-0 z-10">
        <h1 className="font-bold text-2xl mt-4">Now Playing</h1>
        <button className="btn btn-active btn-primary btn-sm" onClick={shuffle}>
          Shuffle
        </button>
        <div className="flex items-center justify-center gap-20">
          <button
            className="btn btn-active btn-primary btn-sm"
            onClick={() => changeSong("prev")}
          >
            Prev
          </button>
          {currSong?.length > 0 && (
            <div>
              <p>{currSong[0].title}</p>
              <p>{currSong[0].artist}</p>
            </div>
          )}
          <button
            className="btn btn-active btn-primary btn-sm"
            onClick={() => changeSong("next")}
          >
            Next
          </button>
        </div>
      </div>
      <div className="mt-52">
        {songList.map((song) => (
          <SongItem
            key={song.id}
            title={song.title}
            artist={song.artist}
            currentPlaying={currentPlaying}
            id={song.id}
          />
        ))}
      </div>
    </div>
  );
};

export default SongList;
