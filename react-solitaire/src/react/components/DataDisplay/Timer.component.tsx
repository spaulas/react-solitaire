import React, { useEffect, useState } from "react";
import { RootReducerState } from "../../../global";
import { useSelector } from "react-redux";

function Timer() {
  // creates a setInterval with respective clearInterval
  // returns the number of hours, minutes and seconds it has passed
  const useTimer = () => {
    // set time states
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    // get timer flag from the GameBoard redux state
    const { timerFlag } = useSelector(({ GameBoard }: RootReducerState) => ({
      timerFlag: GameBoard.timerFlag
    }));

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

    // add one second, minute or hour accordingly
    function tick() {
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

    // return object with every time unit
    return { seconds, minutes, hours };
  };

  // use the timer to get the current time units
  const { seconds, minutes, hours } = useTimer();

  return (
    <div className="timerBox">
      <span>
        {hours > 0 ? `${hours}:` : null}
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </span>
    </div>
  );
}

export default Timer;
