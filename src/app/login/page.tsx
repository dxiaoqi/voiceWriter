'use client'
import { FlowerIcon } from '@/asserts/icon'
import { createClient } from '@/util/supabase/client'
import { useForm } from 'react-hook-form';
import Link from 'next/link'
import { useDisclosure } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const supabase = createClient()
export default function App() {
const {isOpen, onOpen, onOpenChange} = useDisclosure();
const { register, handleSubmit, formState: { errors } } = useForm({});
const [errorMsg, setError] = useState('');
const router = useRouter();
  const onSubmit = async (formData: any) => {
    const supabase = createClient();
    const { error, data } = await supabase.auth.signInWithPassword({
      ...formData
    });
  if (error) {
    setError(error.message)
    onOpen();
    return;
  }
  if (data.user &&
    data.user.identities &&
    data.user.identities.length == 0) 
  {
    setError('There is already an account associated with this email address')
    onOpen();
    return
  }
  if (data.user) {
    // 跳回首页
    router?.push('/')
  }
}

useEffect(() => {
  if (isOpen) {
    setTimeout(() => {
      onOpenChange()
    }, 3000)
  }
}, [isOpen, onOpenChange])
  return (
    <div className="m-auto xl:container px-12 sm:px-0 mx-auto">
      <div className="mx-auto h-full sm:w-max">
              {
        isOpen && (
<div className="absolute max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert">
  <div className="flex items-center p-4">
    <div className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
      <span className="sr-only">Loading...</span>
    </div>
    <p className="ms-3 text-sm text-gray-700 dark:text-neutral-400">
      {errorMsg}
    </p>
  </div>
</div>
        )
      }
        <div className="m-auto  py-12">
          <div className="mt-12 rounded-3xl border bg-gray-50 dark:border-gray-700 dark:bg-gray-800 -mx-6 sm:-mx-10 p-8 sm:p-10">
            <h3 className="flex text-2xl font-semibold text-gray-700 dark:text-white">
                          <a href="/">
              <FlowerIcon style={{ color: 'black' }} />
            </a>Login to your account</h3>
            <div className="mt-12 flex flex-wrap">
              <button
                className="w-full h-11 rounded-full border border-gray-300/75 bg-white px-6 transition active:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700"
              >
                <div className="w-max mx-auto flex items-center justify-center space-x-4">
                  <svg className="w-4" viewBox="0 0 533.5 544.3">
                    <path
                      d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                      fill="#4285f4" />
                    <path
                      d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                      fill="#34a853" />
                    <path
                      d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                      fill="#fbbc04" />
                    <path
                      d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                      fill="#ea4335" />
                  </svg>
                  <span className="block w-max text-sm font-semibold tracking-wide text-cyan-700 dark:text-white"
                  >With Google</span>
                </div>
              </button>
              {/* <button
          className="w-full h-11 rounded-full bg-gray-900 px-6 transition hover:bg-gray-800 focus:bg-gray-700 active:bg-gray-600 dark:bg-gray-700 dark:border dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700"
        >
          <div className="w-max mx-auto flex items-center justify-center space-x-4 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-5"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
            <span className="block w-max text-sm font-semibold tracking-wide text-white"
              >With Github</span>
          </div>
        </button> */}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8 dark:text-white">
              <div>
                <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input {...register("email")} id="" type="email" placeholder="Your email" className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input {...register("password")} type="password" placeholder="Your password" className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
                </div>
                {/* <button type="reset" className="-mr-3 w-max p-3">
            <span className="text-sm tracking-wide text-sky-600 dark:text-sky-400">Forgot password ?</span>
          </button> */}
              </div>

              <div>
                <button
                  type='submit'
                  className="w-full rounded-full bg-sky-500 dark:bg-sky-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800"
                >
                  <span className="text-base font-semibold text-white dark:text-gray-900">Login</span>
                </button>
                <button type="reset" className="-ml-3 w-max p-3">
                  <Link href="/signup" className="text-sm tracking-wide text-sky-600 dark:text-sky-400">Create new account</Link>
                </button>
              </div>
            </form>
          </div>
          {/* <div className="border-t pt-12 text-gray-500 dark:border-gray-800">
            <div className="space-x-4 text-center">
              <span>&copy; VoiceWriter</span>
              <a href="#" className="text-sm hover:text-sky-900 dark:hover:text-gray-300">Contact</a>
              <a href="#" className="text-sm hover:text-sky-900 dark:hover:text-gray-300">Privacy & Terms</a>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}