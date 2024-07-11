import { cn } from "@/util/cn";

export default function Popover({children, className, trigger}: { children: React.ReactNode, className?: string, trigger: React.ReactNode}) {
  return (
<div className="hs-tooltip [--trigger:hover] inline-block">
  <button type="button" className="hs-tooltip-toggle flex justify-center items-center size-10 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
    {trigger}
    <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-3 px-4 bg-white border text-sm text-gray-600 rounded-lg shadow-md dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" role="tooltip">
      {children}
    </span>
  </button>
</div>
  );
}
