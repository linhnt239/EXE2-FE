import { FunctionComponent, PropsWithChildren } from 'react';

import { twMerge } from 'tailwind-merge';

type ButtonCProps = PropsWithChildren & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonC: FunctionComponent<ButtonCProps> = ({ children, className, ...rest }) => {
    return (
        <button
            className={twMerge(
                `flex items-center justify-center rounded-[.5rem] bg-[#47ea4e] px-[1rem] py-[.5rem] text-[.875rem]  font-semibold text-white  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200`,
                className,
            )}
            {...rest}
        >
            {children}
        </button>
    );
};

export default ButtonC;
