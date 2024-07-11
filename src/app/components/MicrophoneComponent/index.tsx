"use client";

// Import necessary modules and components
import { useEffect, useState, useRef, useMemo, useCallback, useContext } from "react";
import { Icon } from '@iconify/react';
import { useTimer } from "@/hooks/timer";
import useSpeechRecognition from "@/hooks/record";
import dayjs from 'dayjs';
import { Task, TaskContext } from "@/context";
// Declare a global interface to add the webkitSpeechRecognition property to the Window object
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

// Export the MicrophoneComponent function component
export default function MicrophoneComponent() {
  // State variables to manage recording status, completion, and transcript
  const { timeLeft, startTimer, stopTimer, resetTimer } = useTimer(1000);
  const [isRecording, setIsRecording] = useState(false);
  const [value, setValue] = useState('');
  const { tasks, updateTasks } = useContext(TaskContext) || {};
  const [blocked, setBlocked] = useState(false);
  const onStart = () => {
    startTimer();
  }

  const genTask = () => {

  }
  const onEnd = async () => {
    // You could do something here after listening has finished
    stopTimer();
    resetTimer();
    const data = await fetch('/api/voice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: value
      }),
    })
    const res = JSON.parse(await data.text());
    const msg: Task  = JSON.parse(res.message);
    updateTasks?.([...(tasks || []), {
      title: msg.title,
      content: msg.content,
      id: (tasks || [])?.length + 1,
      time: dayjs().format('YYYY-MM-DD')
    } as unknown as Task])
  };

  const onResult = (result: string) => {
    setValue(result);
  };

  const onError = (event: any) => {
    if (event.error === 'not-allowed') {
      setBlocked(true);
    }
  };

  const { listen, listening, stop, supported } = useSpeechRecognition({
    onStart,
    onResult,
    onEnd,
    onError,
  });

  const handleToggleRecording = useCallback(() => {
    if (isRecording) {
      setIsRecording(false);
      stop({});
    } else {
      setIsRecording(true)
      listen({ lang: 'zh', continuous: true });
    }
  }, [isRecording, listen, stop])

  useEffect(() => {
    async function a () {
    const data = await fetch('/api/voice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: '今天做了西红柿炒鸡蛋，主要使用了西红柿跟鸡蛋，就是盐方的有点少了'
      }),
    })
    const res = JSON.parse(await data.text());
    console.log(JSON.parse(JSON.stringify(res.message)))
    const msg: Task  = JSON.parse(res.message);
    updateTasks?.([...(tasks || []), {
      title: msg.title,
      content: msg.content,
      id: (tasks || [])?.length + 1,
      time: dayjs().format('YYYY-MM-DD')
    } as unknown as Task])
    }
    a();
  }, [])

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <div className="flex items-center w-full">
          {isRecording ? (
            // Button for stopping recording
            <button
              onClick={handleToggleRecording}
            >
              <Icon icon="pepicons-pop:pause-circle-filled" fontSize={26} style={{ color: '#f4511e' }} />
            </button>
          ) : (
            // Button for starting recording
            <button
              onClick={handleToggleRecording}
            >
              <Icon icon="bi:record-circle-fill" fontSize={26} style={{ color: '#f4511e' }} />
            </button>
          )}
          {isRecording && timeLeft}
        </div>
      </div>
    </div>
  );
}