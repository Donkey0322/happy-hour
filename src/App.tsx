import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { demoList, imageList } from "./image";

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
  user-select: none;
`;

export default function App() {
  const [mode, setMode] = useState("game");
  const [list, setList] = useState(shuffle(imageList));
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (list.length === 1) {
      setList((prev) => [
        ...prev,
        ...(mode === "game" ? shuffle(imageList) : demoList),
      ]);
    } else {
      console.log(list.length, list[0].match(/\/([^/]+)-\d+/)?.[1]);
    }
  }, [list, mode]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      switch (event.code) {
        case "ArrowRight":
          setList((prev) => prev.slice(1));
          break;
        case "KeyD":
          setList(demoList);
          setMode("demo");
          break;
        case "KeyG":
          setList(shuffle(imageList));
          setMode("game");
          break;
        case "Space":
          setShow((prev) => !prev);
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <Background onClick={() => setList((prev) => prev.slice(1))}>
      {show && <ImageContainer src={list[0]} alt="" />}
    </Background>
  );
}
