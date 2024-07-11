import { cn } from "@/util/cn";
import React, { useContext } from "react";
import Card from "../Card";
import { TaskContext } from "@/context";
import { sortTasksByTime } from "@/util/sort";
export const TimeLine = ({ children, className }: any) => {
  const { tasks } = useContext(TaskContext) || {};
  const list = sortTasksByTime(tasks || []);
  return (
    <div className={cn("bg-white border mb-6 overflow-x-auto border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700", className)}>
      {
        list.map(l => (
          <div key={l.time}>
            <div className="ps-2 my-2 first:mt-0">
              <h3 className="text-xs font-medium uppercase text-gray-500 dark:text-neutral-400">
                {l.time}
              </h3>
            </div>
            {
              l.tasks?.map((l) => (
                <Card voiceUrl="" id={l.id} key={l.id} tag={[]} title={l.title} content={l.content} />
              ))
            }
          </div>
        ))
      }

    </div>
  )
}
