'use client';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';

import {
  BellAlertIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
{
  /*import { Dialog, DialogPanel } from '@headlessui/react'*/
}
import SearchInput from '@/app/ui/dashboard/search-input';

export default function Header() {
  return (
    <>
      <header
        style={{ backgroundColor: '#1AA939' }}
        className="absolute inset-x-0 top-0 z-1 "
      >
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-2"
        >
          <div className=" p-4 flex w-[50%] items-center">
            <img
              alt="company logo"
              src="/logo-white-better.png"
              className="w-10 h-10 -mt-3  focus:bg-green-600 focus:shadow-lg focus:shadow-green-500 focus:outline-none"
              tabIndex={0}
            />
            <span
              className="text-white ml-1 text-3xl font-bold focus:bg-green-600 focus:shadow-lg focus:shadow-green-500 focus:outline-none"
              tabIndex={0}
            >
              Educesol
            </span>

            {/* Close Button */}
            <button
              type="button"
              className="ml-6 inline-flex items-center justify-center p-2 text-white  focus:outline-none focus:ring-0 focus:shadow-lg focus:shadow-green-500 rounded-md"
            >
              <span className="sr-only">Open sidebar menu</span>
              <Bars3CenterLeftIcon className="w-8 h-8" aria-hidden="true" />
            </button>
          </div>
          <SearchInput />
          <div className="flex items-center space-x-4 px-9">
            {/* Notification Button */}
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white hover:bg-green-700 focus:bg-green-600 focus:shadow-lg focus:shadow-green-500 border-none outline-none"
            >
              <span className="sr-only">View notifications</span>
              <BellAlertIcon aria-hidden="true" className="size-8" />
            </button>

            {/* User Profile Button */}
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white hover:bg-green-700 focus:bg-green-600 focus:shadow-lg focus:shadow-green-500 border-none outline-none"
            >
              <span className="sr-only">Open user menu</span>
              <UserIcon aria-hidden="true" className="size-8" />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
