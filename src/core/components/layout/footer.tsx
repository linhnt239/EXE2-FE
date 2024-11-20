import { FunctionComponent } from 'react';

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
    return (
        <footer className="flex w-full flex-col items-center justify-center bg-black pb-[60px] pt-[76px]">
            <div className="h-[114px] w-[208px]">
                <img className="h-full w-full object-cover" src="/assets/images/logo.png" alt="" />
            </div>
            <div className="h-[60px] w-0.5 flex-shrink-0  bg-white" />
            <a className="mb-9 mt-2 text-[46px] font-bold text-white" href="mailto:giabaonn079@gmail.com">
                giabaonn079@gmail.com
            </a>
            <div className="mb-[110px] flex flex-col items-center justify-center text-white">
                <div className="h-[60px] w-0.5 flex-shrink-0 bg-current" />
                <div className="h-0.5 w-[300px] flex-shrink-0 bg-current" />
            </div>
            <p className="text-base text-white">© 2023 Desvi by EXE101</p>
        </footer>
    );
};

export default Footer;
