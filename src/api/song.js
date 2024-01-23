import axios from "axios";
const URL = "https://emos-frontend-techtest.vercel.app/api/playlist";

const getSongAPI = async () => {
  const songs = axios.get(URL);
  return songs;
};

export { getSongAPI };
