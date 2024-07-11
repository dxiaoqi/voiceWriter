import { cn } from "@/util/cn";

export default function Conatiner({children, className}: { children: React.ReactNode, className?: string}) {
  return (
    <div className={cn(className, "w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72 dark:bg-neutral-800")}>
      {children}
    </div>
  );
}
