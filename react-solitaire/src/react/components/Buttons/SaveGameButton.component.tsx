import React from "react";
import { RootReducerState } from "../../../global";
import { SaveFilled } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function SaveGameButton() {
  const history = useHistory();
  // get piles from redux
  const { deckPile, flippedPile, columns, goals } = useSelector(
    ({ Deck, Columns, Goal }: RootReducerState) => ({
      deckPile: Deck.deckPile,
      flippedPile: Deck.flippedPile,
      columns: Columns.columns,
      goals: Goal.goals
    })
  );

  const saveGame = () => {
    const currentLocal = localStorage.getItem("offlineUser");
    const offlineUser = currentLocal ? JSON.parse(currentLocal) : {};

    offlineUser.hasSavedGame = true;
    offlineUser.savedGame = { deckPile, flippedPile, columns, goals };
    localStorage.setItem("offlineUser", JSON.stringify(offlineUser));
    history.push("/");
  };

  return <SaveFilled className="iconButton" onClick={saveGame} />;
}

export default SaveGameButton;
