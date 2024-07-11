import { useContext, useState } from "react";
import clsx from "clsx";
import { Icon } from "@iconify/react/dist/iconify.js";
import Edit from "./editr";
import { TaskContext } from "@/context";
export interface CardProps {
  id: string;
  title: string;
  voiceUrl: string;
  tag: string[];
  content: string;
}
export default function Card(props: CardProps) {
  const { title, content, id } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { deleteTask } = useContext(TaskContext) || {};
  const isAuth = true;
  return (
    <div className="flex gap-x-3">
      <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
        <div className="relative z-10 size-7 flex justify-center items-center">
          <Icon className="flex-shrink-0 mt-4" fontSize={26} icon="lets-icons:video-fill" style={{ color: 'black' }} />
          {/* <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600">11</div> */}
        </div>
      </div>

      <div>
        <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full mt-1 -ms-1 p-1 inline-flex flex-start items-center gap-x-2 rounded-lg border border-transparent text-gray-500 disabled:opacity-50 disabled:pointer-events-none">
          <div className="grow pt-0.5 w-full">
            <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
              {title}
            </h3>
            <p style={{
              display: '-webkit-inline-box'
            }} className={
              clsx("inline-block text-left mt-1 text-sm text-gray-600 dark:text-neutral-400", {
                'line-clamp-3': !isOpen
              })
            }>
              {content}
            </p>
          </div>
        </button>
        {
          isAuth && isOpen && (<div className="my-2">
            <div className="inline-flex gap-2 p-1">
              <Edit {...props} />
              {/* <button
                className="inline-flex bg-gray-100 items-center gap-1 rounded-md px-1 py-[0.5] text-xs text-gray-500 hover:text-gray-700 focus:relative"
              >
                <Icon icon="ic:twotone-tag" width="1.2rem" height="1.2rem" style={{ color: 'black' }} />

                Tag
              </button> */}


              <button
                className="inline-flex p-1 px-2 bg-gray-100 items-center gap-1 rounded-md px-1 py-[0.5] text-xs text-gray-500 hover:text-gray-700 focus:relative"
                onClick={() => deleteTask?.(id)}
              >
                <Icon icon="material-symbols:delete-outline" width="1.2rem" height="1.2rem" style={{ color: 'black' }} />

                Delete
              </button>

            </div>
          </div>)
        }
      </div>
    </div>
  )
}