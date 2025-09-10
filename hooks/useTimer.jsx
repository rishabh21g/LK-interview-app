import { useEffect, useRef, useState } from "react";

function useTimer(minutes, finishInterview) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const intervalRef = useRef(null);
  const callbackRef = useRef(finishInterview);

  useEffect(() => {
    callbackRef.current = finishInterview;
  }, [finishInterview]);

  // Reset timer if minutes change
  useEffect(() => {
    setSecondsLeft(minutes * 60);
  }, [minutes]);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current);
          callbackRef.current();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [secondsLeft]);

  // Function to restart the timer
  const restartTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setSecondsLeft(minutes * 60);
  };

  // Format minutes and seconds as MM:SS
  const min = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const sec = (secondsLeft % 60).toString().padStart(2, "0");

  return { min, sec, secondsLeft, restartTimer };
}

export default useTimer;
