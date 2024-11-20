import * as React from 'react';

interface HeroCommonProps {
    title: string;
    description: string;
}

const HeroCommon: React.FunctionComponent<HeroCommonProps> = ({ description, title }) => {
    return (
        <div className="flex h-[342px] w-full items-center justify-center py-[88px]">
            <div className="max-w-app relative h-full w-full items-end justify-center px-[72px] ">
                <div className="absolute left-[72px] top-0  h-[142px] w-[142px] opacity-25">
                    <img src="/assets/images/vector.png" className="h-full w-full" alt="" />
                </div>
                <div className="relative flex h-full flex-col justify-end text-white">
                    <h1 className="text-[51px] font-black">{title}</h1>
                    <p className="w-full max-w-[542px] text-sm">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default HeroCommon;
