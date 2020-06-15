import React, { useState } from "react";

function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hours, setHours] = useState(0);

  // update the timer every 1 second
  setTimeout(() => {
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
  }, 1000);

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
