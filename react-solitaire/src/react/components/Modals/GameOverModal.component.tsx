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
import { Input, List } from "antd";
import React, { useEffect, useState } from "react";
import { convertTime } from "../DataDisplay/Timer.component";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

interface HighScore {
  userName: string;
  finalScore: number;
}

function GameOverModal() {
  const [visible, setVisible] = useState(true);
  const [newHighscore, setNewHighScore] = useState(false);
  const [defaultUserName, setDefaultUserName] = useState<string | undefined>();
  const [inputRef, setInputRef] = useState<ExplicitAny>();
  const history = useHistory();

  // get gameOver value from redux
  const { gameOver, gameMoves, gameTime, nHints } = useSelector(
    ({ Goal, GameBoard }: RootReducerState) => ({
      gameOver: Goal.gameOver,
      gameMoves: GameBoard.gameMoves,
      gameTime: GameBoard.gameTime,
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
    time: convertTime(gameTime),
    moves: gameMoves,
    nHints: nHints,
    finalScore: gameMoves + nHints * 5
  };

  const saveUserGame = () => {
    if (gameOver) {
      // @todo after a user is created at the firebase, add condition here to select where to store the info
      const currentLocal = localStorage.getItem("offlineUser");
      const offlineUser = currentLocal ? JSON.parse(currentLocal) : {};
      // add current statistic to user history
      offlineUser.history = [
        ...(offlineUser?.history || []),
        { ...gameStatistics, seconds: gameTime }
      ];
      // check if the current number of moves is higher than the current max
      if ((offlineUser?.maxMoves || 0) < gameMoves) {
        offlineUser.maxMoves = gameMoves;
      }

      // check if the current game time is higher than the current max
      if ((offlineUser?.maxTime || 0) < gameTime) {
        offlineUser.maxTime = gameTime;
      }

      // get top 10 highscores
      let top = offlineUser?.topHighScores || [];

      if (top.length < 10) {
        // eslint-disable-next-line no-console
        console.log("TOP LENGHT MENOR 10 1 = ", top);
        top = [
          ...top,
          {
            userName: offlineUser?.userName || "localUser",
            finalScore: gameStatistics.finalScore
          }
        ];
        setNewHighScore(true);
      } else {
        const result = top.find((highScore: HighScore) => {
          return gameStatistics.finalScore < highScore.finalScore;
        });
        if (result) {
          // eslint-disable-next-line no-console
          console.log("TOP LENGHT maio 10 = ", top);
          top = [
            ...top,
            {
              userName: offlineUser?.userName || "localUser",
              finalScore: gameStatistics.finalScore
            }
          ];
          setNewHighScore(true);
        }
      }

      top.sort((a: HighScore, b: HighScore) => {
        return a.finalScore < b.finalScore ? -1 : 1;
      });

      offlineUser.top = top;

      setDefaultUserName(offlineUser?.userName);

      localStorage.setItem("offlineUser", JSON.stringify(offlineUser));
    }
  };
  useEffect(saveUserGame, [gameTime]);

  const handleCloseModal = () => {
    if (newHighscore && inputRef?.state?.value) {
      const currentLocal = localStorage.getItem("offlineUser");
      const offlineUser = currentLocal ? JSON.parse(currentLocal) : {};
      let foundOne = false;

      const tempTop = offlineUser?.top.map((highScore: HighScore) => {
        if (highScore.finalScore === gameStatistics.finalScore && !foundOne) {
          foundOne = true;
          return { ...highScore, userName: inputRef.state.value };
        }
        return highScore;
      });

      offlineUser.top = tempTop;
      offlineUser.userName = inputRef.state.value;

      localStorage.setItem("offlineUser", JSON.stringify(offlineUser));
    }

    setNewHighScore(false);
    setVisible(false);
    history.push("/");
  };

  if (gameOver && visible) {
    return (
      <div className="gameFullDiv">
        <div className="gameOverStatistics">
          <div>Game Statistics</div>
          {newHighscore && (
            <div className="newHighScoreContainer">
              <div>New HighScore!</div>
              <Input
                ref={(e: ExplicitAny) => setInputRef(e)}
                placeholder="Add here a username"
                defaultValue={defaultUserName}
              />
            </div>
          )}
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
