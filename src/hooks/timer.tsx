import { useState, useEffect, useRef, useCallback } from 'react';

function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function useTimer(initialSeconds: number = 60) {
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if(timerId.current !== null) return;

    timerId.current = setInterval(() => {
      setTimeLeft(time => time > 0 ? time - 1 : 0);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if(timerId.current) {
      clearInterval(timerId.current);
    }
    timerId.current = null;
  }, []);

  const resetTimer = useCallback(() => {
    stopTimer();
    setTimeLeft(initialSeconds);
  }, [initialSeconds, stopTimer]);

  useEffect(() => {
    return () => {
      if(timerId.current) clearInterval(timerId.current);
    };
  }, []);

  return {
    timeLeft: formatTime(timeLeft),
    startTimer,
    stopTimer,
    resetTimer
  };
}