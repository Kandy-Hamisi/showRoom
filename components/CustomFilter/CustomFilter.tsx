"use client"

import React,  { useState, Fragment } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Listbox, Transition } from '@headlessui/react'
import { CustomFilterProps } from '@/types'
import { UpdateSearchParams } from '@/utils'

const CustomFilter = ({ title, options, setFilter }: CustomFilterProps) => {

  const [selected, setSelected] = useState(options[0]);
  

  const router = useRouter();

  const handleUpdateParams = (e: {type: string, value: string}) => {
    const newPathName = UpdateSearchParams(title, e.value.toLowerCase());

    router.push(newPathName);
  }

  return (
    <div className='relative w-fit z-10'>
      <Listbox
        value={selected}
        onChange={ e => {
            setSelected(e);
            setFilter(e.value);
          }}
      >
        <Listbox.Button className='custom-filter__btn'>
          <span className='block truncate'>{selected.title}</span>
          <Image
            src="/chevron-up-down.svg"
            width={20}
            height={20}
            className='ml-4 object-contain'
            alt='chevron up down'
          />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='custom-filter__options'>
            {options.map((option) => (
              <Listbox.Option
                key={option.title}
                className={({ active }) => `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`}
                value={option}
              >
                {
                  ({ selected }) => (
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option.title}
                    </span>
                  )
                }
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  )
}

export default CustomFilter