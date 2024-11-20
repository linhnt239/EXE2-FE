import * as React from 'react';

import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';

interface ModalBuilderProps {
    btnLabel: React.ReactNode;
    modalTitle: React.ReactNode;
    btnProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    children: React.ReactNode | ((closeModal: () => void) => React.ReactNode);
    className?: string;
    extraClose?: () => void;
    disable?: boolean;
}

const ModalBuilder: React.FC<ModalBuilderProps> = ({
    btnLabel,
    modalTitle,
    btnProps,
    children,
    className,
    extraClose = () => {},
    disable = false,
}) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
        extraClose();
    };

    return (
        <div>
            <button type="button" onClick={() => setIsModalOpen(true)} {...btnProps}>
                {btnLabel}
            </button>

            <Transition appear show={isModalOpen && !disable} as={React.Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center">
                            <Transition.Child
                                as={React.Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className={clsx(className)}>
                                    <Dialog.Title>{modalTitle}</Dialog.Title>
                                    {typeof children === 'function' ? children(closeModal) : children}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ModalBuilder;
