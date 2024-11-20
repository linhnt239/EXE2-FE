import { FC, PropsWithChildren } from 'react';

interface TitleWithDecorationProps extends PropsWithChildren {}

const TitleWithDecoration: FC<TitleWithDecorationProps> = ({ children }) => {
    return (
        <div className="relative">
            <img src="/assets/images/dashboard/textDecoration.svg" className="absolute -left-20 -top-16" />
            <div className="text-[40px] font-semibold text-[#2D2D2D]">{children}</div>
        </div>
    );
};

export default TitleWithDecoration;
