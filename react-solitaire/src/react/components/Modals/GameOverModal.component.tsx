/* eslint-disable indent */
/* eslint-disable react/no-multi-comp */
import {
  CalendarFilled,
  CheckOutlined,
  ClockCircleFilled,
  NumberOutlined,
  StarFilled
} from "@ant-design/icons";
import { ExplicitAny, RootReducerState } from "../../../global";
import React, { useState } from "react";
import { List } from "antd";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function GameOverModal() {
  const [visible, setVisible] = useState(true);
  const history = useHistory();

  // get gameOver value from redux
  const { gameOver, gameMoves, nHints } = useSelector(
    ({ Goal, GameBoard }: RootReducerState) => ({
      gameOver: Goal.gameOver,
      gameMoves: GameBoard.gameMoves,
      nHints: GameBoard.nHints
    })
  );

  const getIcon = (item: string) => {
    switch (item) {
      case "date":
        return <CalendarFilled />;
      case "time":
        return <ClockCircleFilled />;
      case "moves":
        return <NumberOutlined />;
      case "nHints":
        return <StarFilled />;
      default:
        return <CheckOutlined />;
    }
  };

  const gameStatistics: ExplicitAny = {
    date: moment().format("DD/MM/YYYY, hh:mm"),
    time: gameMoves,
    moves: gameMoves,
    nHints: nHints,
    finalScore: gameMoves + nHints * 5
  };

  const handleCloseModal = () => {
    // @todo after a user is created at the firebase, add condition here to select where to store the info
    const currentLocal = localStorage.getItem("offlineUser");
    const offlineUser = currentLocal ? JSON.parse(currentLocal) : {};
    // add current statistic to user history
    offlineUser.history = [...(offlineUser?.history || []), gameStatistics];
    // check if the current number of moves is higher than the current max
    if ((offlineUser?.maxMoves || 0) < gameMoves) {
      offlineUser.maxMoves = gameMoves;
    }

    localStorage.setItem("offlineUser", JSON.stringify(offlineUser));

    setVisible(false);
    history.push("/");
  };

  if (gameOver && visible) {
    return (
      <div className="gameFullDiv">
        <div className="gameOverStatistics">
          <span>Game Statistics</span>
          <List
            dataSource={Object.keys(gameStatistics)}
            renderItem={(item: string) => (
              <List.Item key={item} className="gameStatisticsList">
                {getIcon(item)}
                <List.Item.Meta title={item} />
                <span>{gameStatistics[item].toString()}</span>
              </List.Item>
            )}
          />
          <div
            className={`animatedButton divButton gameOverAnimatedButton`}
            onClick={handleCloseModal}
          >
            <span>Ok</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default GameOverModal;
