import { FC, PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {}

const Card: FC<CardProps> = ({ children }) => {
    return (
        <div
            className="flex min-h-[75vh] min-w-[400px] flex-col justify-between bg-white p-[24px]"
            style={{
                boxShadow: '0px 16px 24px -4px rgba(30, 41, 59, 0.16), 0px 2px 2px -1px rgba(30, 41, 59, 0.04)',
            }}
        >
            {children}
        </div>
    );
};

export default Card;
