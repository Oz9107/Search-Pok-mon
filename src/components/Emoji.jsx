import axios from "axios";
import { useState, useEffect } from "react";

const Emoji = () => {

  const [emojiData, setEmojiData] = useState({});

  useEffect(() => {
    axios
      .get("https://api.emojisworld.fr/v1/random?limit=1")

      .then( resp => {
        console.log(resp.data.results[0]);
        //ES DECIR LO DESGLOSAMOS COMO A UN ARREGLO EN JAVASRIPT
        setEmojiData(resp.data.results[0]);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <h1>{emojiData.name}</h1>
      <div>{emojiData.emoji}</div>
    </>
  );
};
export default Emoji;
