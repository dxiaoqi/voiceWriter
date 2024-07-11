'use client'
import { Bubble } from "./components/Bubble";
import Conatiner from "./components/Container";
import { TimeLine } from "./components/TimeLine";
import MicrophoneComponent from "./components/MicrophoneComponent";
import { Sidebar } from "./components/Sidebar";
import { TaskProvider } from "@/context";
export default function Home() {
  return (
    <>
    <TaskProvider>
      <Sidebar />
      <Conatiner className="pt-3">
        <TimeLine />
        <div className="fixed bottom-6 flex justify-center w-full">
          <Bubble>
            <MicrophoneComponent />
          </Bubble>
        </div>
      </Conatiner>
      </TaskProvider>
    </>
  );
}
