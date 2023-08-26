// src/components/AppBar.js
import {Fragment} from 'react';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline'
// import SettingsIcon from './settingsIcon';
// import PreferencesIcon from './preferencesIcon';
import PreferencesModal from '../preferences/preferencesModal';


const Appbar = () => {
    const auth = localStorage.getItem("authToken")

    const userNavigation = [
        { name: 'Profile', href: '#' },
        { name: 'Sign out', href: '/logout' },
      ]

const classNames = (...classes: string[]): string => classes.filter(Boolean).join(' ');


  return (
    <>
    
<nav className="bg-grey border-gray-200 dark:bg-gray-900 w-full">
    <div className="flex  items-center justify-between mx-auto max-w-screen-xl p-4">
        <a href="/" className="flex items-center">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Sports Centre</span>
        </a>
        <div className="flex items-center">
        {auth && (
    <PreferencesModal/>
  )}
        {!auth &&
        <div className="flex items-center">
            <a href="/signin" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</a>
        </div>
        }
        {auth &&
        <div>



        
<Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="rounded-full bg-white p-1 text-gray-400 hover:text-blue-600">
                        <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  </div>

}
</div>
    </div>
</nav>
</>
  );
};

export default Appbar;