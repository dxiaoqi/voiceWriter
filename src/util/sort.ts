import { Task } from "@/context";

export function sortTasksByTime(tasks: Task[]): { time: string; tasks: Task[] }[] {
  const sortedTasks: { time: string; tasks: Task[] }[] = [];

  tasks.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  let currentTime = '';
  let currentTasks: Task[] = [];

  for (const task of tasks) {
    if (task.time === currentTime) {
      currentTasks.push(task);
    } else {
      if (currentTasks.length > 0) {
        sortedTasks.push({ time: currentTime, tasks: currentTasks });
      }
      currentTime = task.time;
      currentTasks = [task];
    }
  }

  if (currentTasks.length > 0) {
    sortedTasks.push({ time: currentTime, tasks: currentTasks });
  }

  return sortedTasks;
}