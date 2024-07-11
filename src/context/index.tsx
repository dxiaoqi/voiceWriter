import React, { createContext, useState, useEffect } from'react';

export interface Task {
  id: string;
  title: string;
  time: string;
  content: string;
}

interface TaskContextValue {
  tasks: Task[];
  updateTasks: (newTasks: Task[]) => void;
  editTask: (taskId: string, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
}

export const TaskContext = createContext<TaskContextValue | null>(null);

export const TaskProvider= (props: any) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const editTask = (taskId: string, updatedTask: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId? {...task,...updatedTask } : task))
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id!== taskId));
  };
  useEffect(() => {
    // const storedTasks = localStorage.getItem('tasks');
    // if (storedTasks) {
    //   setTasks(JSON.parse(storedTasks));
    // }
  }, []);

  useEffect(() => {
    // localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const updateTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, updateTasks,deleteTask, editTask }}>
      {props?.children}
    </TaskContext.Provider>
  );
};