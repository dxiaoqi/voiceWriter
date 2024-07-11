import { createClient } from "@/util/supabase/client"
import { useDisclosure } from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
const supabase = createClient();
export function User() {
const [email, setEmail] = useState('');
 const {isOpen, onOpen, onOpenChange} = useDisclosure();
 const router = useRouter();
useEffect(() => {
  supabase.auth.getUser().then(data =>{
  return setEmail(data?.data.user?.email as string);
  })
}, [])
  const loginOUt = async () => {
    await supabase.auth.signOut();
    onOpenChange();
    router?.push('/')
  }
  return (
    email ? (
          <div className="flex-column p-6 w-full">
      <a onClick={onOpen} className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-neutral-700 rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:text-white">
        {email}
      </a>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Setting</ModalHeader>
              <ModalBody>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={loginOUt}>
                  Login Out
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
    ) : (
    <div className="flex-column p-6 w-full">
      <a className="flex mb-2 items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-neutral-700 rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:text-white" href="/login">
        Login
      </a>
      <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:text-white" href="/signup">
        Signup
      </a>
    </div>
    )
  )
}