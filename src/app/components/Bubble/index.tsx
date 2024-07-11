import { cn } from "@/util/cn";
import React from "react";
export const Bubble = ({ children, className }: any) => {
  return (
    <div className={cn("fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-white dark:border-neutral-700", className)}>
      {children}
    </div>
  )
}