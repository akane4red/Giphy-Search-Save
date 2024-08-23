import React, { useContext, useState, useEffect } from "react";
import { Image } from "@mantine/core";
import { FaHeart } from "react-icons/fa";
import { useHover } from "@mantine/hooks";
import { UserContext } from "../../App";

const Gif = (props) => {
  const { savedGifs, setSavedGifs } = useContext(UserContext);
  const { hovered, ref } = useHover();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const isAlreadySaved = savedGifs.some((gif) => gif.id === props.id);
    setIsClicked(isAlreadySaved);
  }, [savedGifs, props.id]);

  const handleClick = () => {
    if (isClicked) {
      setSavedGifs(savedGifs.filter((gif) => gif.id !== props.id));
    } else {
      const newGif = { id: props.id, url: props.url };
      setSavedGifs([...savedGifs, newGif]);
    }

    setIsClicked(!isClicked);
  };

  const heartColor = isClicked ? "red" : hovered ? "pink" : "white";

  return (
    <div
      className="image-container"
      ref={ref}
      onClick={handleClick}
      style={{ cursor: props.isInteractive ? "pointer" : "default", position: "relative" }}
    >
      <Image src={props.url} alt="" />
      <FaHeart
        color={heartColor}
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          fontSize: "54px",
        }}
      />
    </div>
  );
};

export default Gif;
