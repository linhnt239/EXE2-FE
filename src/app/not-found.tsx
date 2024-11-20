import * as React from 'react';

import Link from 'next/link';

interface NotFoundPageProps {}

const NotFoundPage: React.FunctionComponent<NotFoundPageProps> = () => {
    return (
        <div className="bg-primary/50 flex h-[1000px] w-full flex-col items-center justify-center text-white">
            <h1 className="text-[100px] font-black">ERROR 404</h1>
            <p className="mb-10 text-[25px]">Page not Found, please o back</p>
            <Link href="/">
                <div className="bg-primary flex h-[88px] w-[272px] items-center justify-center text-[15px]">Back To Home</div>
            </Link>
        </div>
    );
};

export default NotFoundPage;
