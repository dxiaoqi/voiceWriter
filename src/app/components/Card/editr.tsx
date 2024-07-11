// @ts-ignore
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/modal";
import { useContext, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import ReactContentEditable from 'react-contenteditable';
import { useDisclosure } from "@nextui-org/react";
import { TaskContext } from "@/context";
export interface CardProps {
  id: string;
  title: string;
  voiceUrl: string;
  tag: string[];
  content: string;
}
export default function Edit(props: CardProps) {
  const { editTask } = useContext(TaskContext) || {};
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [_title, setTitle] = useState(props.title);
  const [_content, setContent] = useState(props.content);
  const isAuth = true;
  const save = () => {
    editTask?.(props?.id, {
      ...props,
      title: _title,
      content: _content
    })
    onOpenChange();
  }

  const cancel = () => {
    setTitle(props.title);
    setContent(props.content);
    onOpenChange();
  }
  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="inline-flex bg-gray-100 items-center gap-1 rounded-md px-1 py-[0.5] text-xs text-gray-500 hover:text-gray-700 focus:relative"
      >
        <Icon icon="lucide:edit" width="1.2rem" height="1.2rem" className="dark:bg-gray-800 dark:text-white bg-white text-black" />

        Edit
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit
              </ModalHeader>
              <ModalBody>
                <ReactContentEditable
                  html={_title}
                  onChange={event => setTitle((event.target as any).value)}
                />
                <ReactContentEditable
                  html={_content}
                  onChange={event => setContent((event.target as any).value)}
                />

              </ModalBody>
              <ModalFooter className="text-5">
                <button
                  onClick={save}
                  type="button"
                  className="p-1 px-2 bg-gray-100 p-3 inline-flexitems-center gap-1 rounded-sm px-2 py-1 text-xs text-gray-500 hover:text-gray-700 focus:relative"
                >
                  save
                </button>
                <button
                  type="button"
                  onClick={cancel}
                  className="inline-flex items-center gap-1 rounded-sm px-2 py-1 text-xs text-gray-500 hover:text-gray-700 focus:relative"
                >
                  cancel
                </button>
              </ModalFooter>
            </>)}
        </ModalContent>
      </Modal>
    </>
  )
}