/* eslint-disable indent */
/* eslint-disable react/no-multi-comp */
import {
  CheckOutlined,
  ClockCircleFilled,
  NumberOutlined,
  StarFilled
} from "@ant-design/icons";
import React, { useState } from "react";
import { List } from "antd";
import { RootReducerState } from "../../../global";
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
      case "Time":
        return <ClockCircleFilled />;
      case "Moves":
        return <NumberOutlined />;
      case "Hints":
        return <StarFilled />;
      default:
        return <CheckOutlined />;
    }
  };

  const gameStatistics = [
    {
      title: "Time",
      data: gameMoves
    },
    {
      title: "Moves",
      data: gameMoves
    },
    {
      title: "Hints",
      data: nHints
    },
    {
      title: "Final Score",
      data: gameMoves + nHints * 5
    }
  ];

  const handleCloseModal = () => {
    // @todo after a user is created at the firebase, add condition here to select where to store the info
    const currentLocal = localStorage.getItem("offlineUser");
    const offlineUser = currentLocal
      ? JSON.parse(currentLocal)
      : { history: [] };
    // add current statistic to user history
    offlineUser.history = [...offlineUser?.history, ...gameStatistics];
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
            dataSource={gameStatistics}
            renderItem={({ title, data }: { title: string; data: number }) => (
              <List.Item key={title} className="gameStatisticsList">
                {getIcon(title)}
                <List.Item.Meta title={title} />
                <span>{data}</span>
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
