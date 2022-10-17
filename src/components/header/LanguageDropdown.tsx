import { Menu, Transition } from "@headlessui/react";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useTranslation } from 'react-i18next'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function LanguageDropdown() {
  const { i18n } = useTranslation()

  const languages = [
    { text: 'English', id: 'en' },
    { text: 'Francais', id: 'fr' },
  ]

  function switchLanguage(language : string) {
    i18n.changeLanguage(language)
    console.log(i18n);
  }

  return(<Menu as="div" className="relative inline-block text-left">
  <div>
    <Menu.Button className="inline-flex w-full items-end rounded-md px-4 py-2 text-sm font-medium  text-gray-300 shadow-sm hover:bg-gray-700">
    <GlobeAltIcon className="mr-2 ml-1 h-5" aria-hidden="true" />
    <p className="text-base text-transform: capitalize">{i18n.language}</p>
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
  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
    <div className="py-1">
      {languages.map((language) => (
        <Menu.Item key={language.id}>
        {({ active }) => (
          <a
            className={classNames(
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
              'block px-4 py-2 text-sm', 'hover:cursor-pointer'
            )}
            onClick={() => switchLanguage(language.id)}
          >
            {language.text}
          </a>
        )}
      </Menu.Item>
      ))}
    </div>
  </Menu.Items>
</Transition>
</Menu>)
}