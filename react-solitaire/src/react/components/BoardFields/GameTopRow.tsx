import React, { memo, useLayoutEffect, useRef, useState } from "react";
import Deck from "./Deck";
import GoalSpotWrapper from "./GoalSpotWrapper";
import { RefAny } from "../../../global";
import { Row } from "antd";

function GameTopRow() {
  const deckRef: RefAny = useRef();
  const flippedRef: RefAny = useRef();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [translation, setTranslation]: [RefAny, RefAny] = useState();

  // @todo send tranlation to redux
  useLayoutEffect(() => {
    if (deckRef.current) {
      const deckX = deckRef?.current.getBoundingClientRect().x;
      const flippedX = flippedRef?.current.getBoundingClientRect().x;
      setTranslation(flippedX - deckX);
    }
  }, []);

  return (
    <Row gutter={6} className="boardDeckRow" align="middle">
      <Deck deckRef={deckRef} flippedRef={flippedRef} />
      <GoalSpotWrapper />
    </Row>
  );
}

export default memo(GameTopRow);
