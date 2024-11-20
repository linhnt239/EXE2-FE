import { Fragment, FunctionComponent, useState } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface TaskLineProps {}

export enum StatusEnum {
    GREEN = 1,
    BLUE = 2,
    RED = 3,
    WHITE = 4,
}

const options = [
    { id: StatusEnum.GREEN, name: 'Green', hex: '#00ff66' },
    { id: StatusEnum.BLUE, name: 'Blue', hex: '#0587ff' },
    { id: StatusEnum.RED, name: 'Red', hex: '#F32C2C' },
    { id: StatusEnum.WHITE, name: 'White', hex: '#ffff' },
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

interface TaskProps {
    avatar?: string | null;
    title?: string;
    date?: string;
    color: StatusEnum;
}

const Task = (props: TaskProps) => {
    const [selected, setSelected] = useState<number>(props.color.valueOf());
    return (
        <div className="flex justify-between gap-10 border-2 border-dashed border-[#CBD5E1] bg-[#E2E8F0] p-[12PX] ">
            {props.avatar ? <img src={props.avatar} /> : <div className="w-10"></div>}
            <div className="flex flex-col items-center">
                <div className="text-[14px]">{props.title}</div>
                <div className="text-[12px]">{props.date}</div>
            </div>
            <div className="flex items-center">
                <Listbox value={selected} onChange={setSelected}>
                    {({ open }) => (
                        <div className="relative mt-2">
                            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <span className="flex items-center">
                                    <span
                                        className={'inline-block h-3 w-3 flex-shrink-0 rounded-full border border-black '}
                                        style={{
                                            backgroundColor: options.filter((i) => i.id.valueOf() === selected)[0].hex,
                                        }}
                                    />
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </Listbox.Button>

                            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <Listbox.Options className="z-10 mt-1  w-32 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {options.map((status) => (
                                        <Listbox.Option
                                            key={status.id}
                                            className={({ active }) =>
                                                classNames(
                                                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                    'relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900',
                                                )
                                            }
                                            value={status.id}
                                        >
                                            {({ selected, active }) => (
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={'inline-block h-3 w-3 flex-shrink-0 rounded-full border border-black'}
                                                        aria-hidden="true"
                                                        style={{
                                                            backgroundColor: status.hex,
                                                        }}
                                                    />
                                                    <span className="font-normal">{status.name}</span>
                                                </div>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    )}
                </Listbox>
            </div>
        </div>
    );
};

export default Task;
