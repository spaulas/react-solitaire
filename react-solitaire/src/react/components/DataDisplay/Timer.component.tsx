import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "../../../global";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";

export const convertTime = (value: number) => {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor(value / 60) % 60;
  const seconds = value % 3600;
  return `${hours > 0 ? `${hours}:` : "0:"}${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
};

/**
 * Component that displays the time of the game
 */
function Timer() {
  const dispatch = useDispatch();
  // creates a setInterval with respective clearInterval
  // returns the number of hours, minutes and seconds it has passed
  const useTimer = () => {
    // set time states
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    // get timer flag and the game pause from the GameBoard redux state
    const { timerFlag, gamePaused, gameOver } = useSelector(
      ({ GameBoard, Goal }: RootReducerState) => ({
        timerFlag: GameBoard.gameFlag,
        gamePaused: GameBoard.gamePaused,
        gameOver: Goal.gameOver
      })
    );

    // update the timer at every 1 second
    useEffect(() => {
      const timerID = setInterval(() => tick(), 1000);
      return function cleanup() {
        clearInterval(timerID);
      };
    });

    // when the timer flag is toggled, reset the timer
    useEffect(() => {
      setSeconds(0);
      setMinutes(0);
      setHours(0);
    }, [timerFlag]);

    const handleGameOver = () => {
      if (gameOver) {
        dispatch(
          gameBoardActions.saveGameTime(hours * 3600 + minutes * 60 + seconds)
        );
      }
    };
    useEffect(handleGameOver, [gameOver]);

    // add one second, minute or hour accordingly
    function tick() {
      // only add one second if the game is not paused
      if (!gamePaused && !gameOver) {
        // if a minute has passed
        if (seconds === 59) {
          // if 59 minutes have passed
          if (minutes === 59) {
            // the reset the minutes and seconds and add one hour
            setSeconds(0);
            setMinutes(0);
            setHours(hours + 1);
          } else {
            // the reset the seconds and add one minute
            setSeconds(0);
            setMinutes(minutes + 1);
          }
        } else {
          // if none of the above, then simply add one second
          setSeconds(seconds + 1);
        }
      }
    }

    // return object with every time unit
    return { seconds, minutes, hours };
  };

  // use the timer to get the current time units
  const { seconds, minutes, hours } = useTimer();

  return (
    <span>
      {hours > 0 ? `${hours}:` : null}
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </span>
  );
}

export default Timer;
