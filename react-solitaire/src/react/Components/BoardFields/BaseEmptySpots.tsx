import { Button, Row } from "antd";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardSpot } from "../Cards/Cards.items";
import { RedoOutlined } from "@ant-design/icons";
import { RootReducerState } from "../../../global";
import _debounce from "lodash.debounce";
import deckActions from "../../../redux/deck/deck.actions";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";

/**
 * Base Layout with all the empty card spots
 */
function BaseEmptySpots() {
  const dispatch = useDispatch();
  // get refs from redux
  const { deckRef, flippedRef, lastHint } = useSelector(
    ({ Deck, GameBoard }: RootReducerState) => {
      const gameHints = GameBoard.gameHints;
      const lastIndex = gameHints.length - 1;
      return {
        deckRef: Deck.deckRef,
        flippedRef: Deck.flippedRef,
        lastHint: lastIndex >= 0 ? gameHints[lastIndex] : undefined
      };
    }
  );

  /**
   * Sets a new translation value for the deck cards to the flipped pile
   */
  const setTranslation = () => {
    // if the refs are not null
    if (deckRef && deckRef.current && flippedRef.current) {
      // get the x position of the deck pile
      const deckX = deckRef.current.getBoundingClientRect().x;
      // get the x position of the flipped pile
      const flippedX = flippedRef.current.getBoundingClientRect().x;
      // save the distance at the redux
      dispatch(deckActions.setTranslation(flippedX - deckX));
    }
  };

  // Only called when the component is mounted and when the deckRef is set
  useEffect(setTranslation, [deckRef]);

  useEffect(() => {
    // debounce assures that the function is only called once every 100 ms
    const handleResize = _debounce(() => {
      setTranslation();
    }, 100);

    // add event listener for the window
    window.addEventListener("resize", handleResize);

    return () => {
      // remove event listener when the component is unmounted
      window.removeEventListener("resize", handleResize);
    };
  });

  const handleResetDeck = () => {
    // resets the deck
    dispatch(deckActions.startUndoAnimation());
    setTimeout(() => dispatch(deckActions.resetDeck()), 600);
    // adds one movement to the game
    dispatch(
      gameBoardActions.addGameMove({
        source: "flippedPile",
        target: "deckPile",
        cards: []
      })
    );
  };

  // if the last hint as deckPile as source and no target, then the hint is to reset the deck
  const shake =
    lastHint && lastHint.source === "deckPile" && lastHint.target === undefined;

  return (
    <div className="baseEmptySpots" id="baseEmptySpots">
      <Row gutter={6} className="boardDeckRow" align="middle">
        {/* Deck and Flipped piles */}
        <CardSpot ref={deckRef} offset={2} className="joyrideDeck deckCardSpot">
          {/* Button to reset deck */}
          <Button
            className={`redoDeckButton ${shake ? "shakeAnimationButton" : ""}`}
            onClick={handleResetDeck}
          >
            <RedoOutlined />
          </Button>
        </CardSpot>
        <CardSpot ref={flippedRef} />
        {/* Goal Spots */}
        <CardSpot offset={3} className="joyrideGoals" />
        <CardSpot />
        <CardSpot />
        <CardSpot />
      </Row>
      <Row gutter={6} align="middle" className="joyrideColumns">
        {/* Game Columns */}
        <CardSpot offset={2} className="joyrideDoubleClick" />
        <CardSpot />
        <CardSpot />
        <CardSpot />
        <CardSpot />
        <CardSpot />
        <CardSpot />
      </Row>
    </div>
  );
}

export default memo(BaseEmptySpots);
