import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { imageList } from "./image";

const Background = styled.div`
  background-color: black;
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px;
`;

const ImageContainer = styled.img`
  width: 35vmax;
  object-fit: cover;
  object-position: center;
`;

export default function App() {
  const [list, setList] = useState(shuffle(imageList));

  useEffect(() => {
    if (list.length === 1) {
      setList((prev) => [...prev, ...shuffle(imageList)]);
    } else {
      console.log(list.length, list[0].match(/\/([^/]+)-\d+/)?.[1]);
    }
  }, [list]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === "ArrowRight") setList((prev) => prev.slice(1));
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <Background onClick={() => setList((prev) => prev.slice(1))}>
      <ImageContainer src={list[0]} alt="" />
    </Background>
  );
}
