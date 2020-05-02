/* eslint-disable no-console */
/* eslint-disable react/no-multi-comp */
import { CardFlippable, CardSpot } from "../CardsItems";
import React, { forwardRef, memo } from "react";
import { RefAny, RootReducerState } from "../../../../global";
import { useDispatch, useSelector } from "react-redux";
import { CardsPile } from "../../../../redux/deck/deck.types";
import { Col } from "antd";
import deckActions from "../../../../redux/deck/deck.actions";

const DeckPile = (props: RefAny, ref: RefAny) => {
  const dispatch = useDispatch();
  // get piles from redux
  const { deckPile, translation, topDeck } = useSelector(
    ({ Deck }: RootReducerState) => ({
      deckPile: Deck.deckPile,
      topDeck: Deck.topDeck,
      translation: Deck.translation
    })
  );
  // swap from deck to flipped pile
  const handleDeckSwap = async (cardId: number) => {
    // wait for the css animation to end
    setTimeout(() => {
      dispatch(deckActions.flipDeckPile(cardId));
    }, 600);
  };

  const printCard = (index: number) => {
    return (
      <CardFlippable
        key={`deck_${index}`}
        removeCard={() => handleDeckSwap(index)}
        translation={translation}
      />
    );
  };

  const getTopCard = () => {
    return topDeck ? printCard(topDeck) : null;
  };

  const getBottomCards = () => {
    const bottomCardsArray = deckPile.map(
      (card: CardsPile) => card.id !== topDeck && printCard(card.id)
    );
    bottomCardsArray.push(<CardSpot ref={ref} />);
    return bottomCardsArray;
  };

  return (
    <Col className="cardPile" span={3} offset={2}>
      <div className="cardPileContainerTop">{getTopCard()}</div>
      <div className="cardPileContainerBottom">{getBottomCards()}</div>
    </Col>
  );
};

export default memo(forwardRef(DeckPile));
