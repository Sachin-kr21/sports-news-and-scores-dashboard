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
     {/* border-gray-200 dark:bg-gray-900 */}
<nav className=" w-full bg-blue-400 rounded-lg">
    <div className="flex  items-center justify-between max-w-screen-xl p-4">
        <a href="/" className="flex items-center">
            {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Dashboard</span> */}
            <img src='../sports tracker logo.svg' className="h-12 mr-3 pl-10" alt="Sports Tracker" />
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



        
<Menu as="div" className="relative ml-3 pr-10">
                    <div>
                      <Menu.Button className="rounded-full bg-green-200 p-1 text-gray-400 hover:text-blue-600">
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