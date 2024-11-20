'use client';

import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import { FeedbackAnonymousIV1CreateDto, feedbackAnonymousApi } from '@/core/api/feedback-anonymous.api';
import NKTextField from '@/core/components/form/NKTextField';
import NKTextareaField from '@/core/components/form/NKTextareaField';

interface HomePageProps {}

const defaultValues: FeedbackAnonymousIV1CreateDto = {
    email: '',
    description: '',
    name: '',
    imageUrls: [],
    phone: 'phone',
    subject: '',
};

const HomePage: React.FunctionComponent<HomePageProps> = () => {
    const router = useRouter();

    const methods = useForm<FeedbackAnonymousIV1CreateDto>({ defaultValues });

    const onSubmit = (data: FeedbackAnonymousIV1CreateDto) => {
        createFeedbackMutation.mutate(data);
    };

    const createFeedbackMutation = useMutation(
        async (data: FeedbackAnonymousIV1CreateDto) => {
            return await feedbackAnonymousApi.v1Post(data);
        },
        {
            onSuccess: () => {
                methods.reset();
                toast.success('Gửi phản hồi thành công');
            },
        },
    );

    return (
        <div className="relative flex h-full  min-h-screen w-full flex-col bg-black">
            <Link href="/#home">
                <div
                    id="home"
                    className={`font-rubik bg-div-home inline-flex h-[1003px] w-full flex-col items-start justify-between gap-y-3.5
                bg-[url(/assets/images/home.png)] bg-cover bg-no-repeat  p-96 text-left text-white [background-position:0px_-26.97px]`}
                >
                    <div className="flex items-center self-stretch text-[80px] font-bold leading-[96px] tracking-[0px] [max-width:1170px]">
                        Tìm kiếm việc làm
                    </div>
                    <div className="flex items-center justify-center rounded-[50px] border-2 border-solid border-green-400 bg-green-400 px-10 py-2.5 text-sm font-normal leading-[35px] tracking-widest">
                        <div className="flex flex-grow items-center">
                            <span>Tìm hiểu thêm</span>
                        </div>
                    </div>
                </div>
            </Link>

            <section id="services" className={`relative inline-flex h-[829px] w-full flex-row flex-wrap justify-center gap-x-8  pb-44 pt-56`}>
                <div className="absolute inset-0 bg-[#000000] bg-[url(https://demo.cocobasic.com/seppo-html/demo-1/images/on_black_left.png)] bg-left-bottom bg-no-repeat" />
                <div className="bg-background-1 absolute inset-0 bg-no-repeat [background-position:0px_545px] [background-size:17%_60%]" />
                <div className="absolute left-0 top-0">
                    <div className="relative flex h-[-95px] items-center justify-between text-left text-base font-normal leading-6 tracking-widest text-white">
                        <div className="flex flex-grow items-center justify-center self-stretch bg-green-400 px-24 py-14 after:absolute after:right-[0] after:top-[0] after:h-[0] after:w-[0] after:translate-x-full after:border-r-[60px] after:border-t-[136px] after:border-solid  after:border-green-400 after:content-[''] after:[clip-path:polygon(0_0,_0%_100%,_78%_0)]">
                            <h3 className="flex flex-grow items-center [max-width:285px]">SERVICES</h3>
                        </div>
                    </div>
                </div>
                <div className="relative grid w-full max-w-[1170px] grid-cols-3  gap-x-24 gap-y-24">
                    <div className="col-span-1 flex flex-grow flex-col items-start justify-between gap-y-0.5 self-stretch">
                        <div className="flex h-40 items-start self-stretch overflow-clip pr-48 text-left text-[264px] font-bold leading-[264px] tracking-[0px] text-black">
                            <div className="flex flex-grow items-center  [text-shadow:0px_-1px_0px_#B3B3B3,_1px_0px_0px_#B3B3B3,_0px_1px_0px_#B3B3B3,_-1px_0px_0px_#B3B3B3]">
                                1
                            </div>
                        </div>
                        <div className="flex items-center text-left text-[46px] font-bold leading-[51px] tracking-[0px] text-white [max-width:328px]">
                            Freelancer
                        </div>
                        <div className="flex items-end justify-center pt-3 text-left text-lg font-normal leading-[35px] tracking-[0px] text-neutral-400">
                            <div className="flex flex-grow items-center [max-width:328px]">Tôi cần tìm việc làm</div>
                        </div>
                        <Link
                            href={NKRouter.project.index()}
                            className="flex items-center justify-between gap-x-4 pt-28 text-right text-base font-normal leading-[35px] tracking-widest text-white"
                        >
                            <div className="h-9 w-9 rounded-full border-2 border-solid border-white" />
                            <div className="flex items-center justify-end">MORE</div>
                        </Link>
                    </div>
                    <div className="col-span-1 flex flex-grow flex-col items-start justify-between gap-y-0.5 self-stretch">
                        <div className="flex h-40 items-start self-stretch overflow-clip pr-40 text-left text-[264px] font-bold leading-[264px] tracking-[0px] text-black">
                            <div className="flex flex-grow items-center [text-shadow:0px_-1px_0px_#B3B3B3,_1px_0px_0px_#B3B3B3,_0px_1px_0px_#B3B3B3,_-1px_0px_0px_#B3B3B3]">
                                2
                            </div>
                        </div>
                        <div className="flex items-center text-left text-[46px] font-bold leading-[51px] tracking-[0px] text-white [max-width:328px]">
                            Client
                        </div>
                        <div className="flex items-end justify-center pt-3 text-left text-lg font-normal leading-[35px] tracking-[0px] text-neutral-400">
                            <div className="flex flex-grow items-center [max-width:328px]">Tôi cần tìm designer</div>
                        </div>
                        <Link
                            href={NKRouter.client.project.index()}
                            className="flex items-center justify-between gap-x-4 pt-28 text-right text-base font-normal leading-[35px] tracking-widest text-white"
                        >
                            <div className="h-9 w-9 rounded-full border-2 border-solid border-white" />
                            <div className="flex items-center justify-end">MORE</div>
                        </Link>
                    </div>
                </div>
            </section>

            <section
                id="about"
                className={` relative inline-flex h-[1050px] w-full flex-row items-center justify-center pb-[115px] pt-[200px] text-left`}
            >
                <div className="absolute inset-0 bg-white" />
                <div className="absolute left-0 top-0">
                    <div className="relative flex h-[-95px] items-center justify-between text-left text-base font-normal leading-6 tracking-widest text-white">
                        <div className="flex flex-grow items-center justify-center self-stretch bg-green-400 px-24 py-14 after:absolute after:right-[0] after:top-[0] after:h-[0] after:w-[0] after:translate-x-full after:border-r-[60px] after:border-t-[136px] after:border-solid  after:border-green-400 after:content-[''] after:[clip-path:polygon(0_0,_0%_100%,_78%_0)]">
                            <h3 className="flex flex-grow items-center [max-width:285px]">ABOUT</h3>
                        </div>
                    </div>
                </div>
                <div className="relative flex  w-full max-w-[1170px]">
                    <div className="flex w-full items-start justify-between gap-x-24  [min-width:538px]">
                        <div className="flex items-end justify-center ">
                            <div className="flex flex-grow flex-col items-start justify-center gap-y-4">
                                <div className="flex items-center text-base font-normal leading-[35px] tracking-widest text-neutral-400 [max-width:538px]">
                                    WHO WE ARE
                                </div>
                                <div className="flex items-center justify-center self-stretch pt-1 text-5xl font-bold leading-[72px] tracking-[0px] text-black">
                                    <div className="flex flex-grow items-center [max-width:538px]">
                                        <span>
                                            Làm việc online
                                            <br />
                                            một cách hiệu quả
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center text-lg font-normal leading-[35px] tracking-[0px] text-neutral-400 [max-width:538px]">
                                    Chúng tôi kết nối bạn với đối tác một cách nhanh chóng
                                </div>
                                <div className="flex flex-grow items-end justify-center pt-48 text-sm font-normal leading-[35px] tracking-widest text-white">
                                    <div className="flex flex-grow items-center justify-center rounded-[50px] border-2 border-solid border-green-400 bg-green-400 px-10 py-2.5">
                                        <div className="flex flex-grow items-center">
                                            <a href="#">Tìm Hiểu Thêm</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-[692px] w-full max-w-[538px] bg-blue-400">
                            <img
                                src="https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/images/33%3A83.webp"
                                className="h-full w-full object-cover"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="clients"
                className={`font-rubik  relative flex h-[1012px] w-full justify-center  bg-no-repeat  py-44 font-normal [background-position:0px_-23.02px] [background-size:100%_105%]`}
            >
                <div className="absolute left-0 top-0 z-0 h-full w-full">
                    <img src="/assets/images/home/clients.png" className="h-full w-full object-cover" alt="" />
                </div>
                <div className="relative z-10 flex w-full max-w-[1170px] flex-col items-center justify-between gap-y-16 self-stretch bg-black p-32">
                    <img
                        className="h-20 self-stretch"
                        src="https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/images/33%3A91.webp"
                    />
                    <div className="flex flex-grow self-stretch">
                        <div className="flex h-full w-full flex-col items-center justify-between gap-y-6 overflow-clip pb-[0.47px]">
                            <div className="flex items-center self-stretch text-left text-[28px] leading-[48px] tracking-[0px] text-neutral-400 [max-width:910px]">
                                Một designer giỏi là một người hiểu ý muốn của mình, một designer vĩ đại là một người hiểu ý muốn của khách hàng
                            </div>
                            <div className="flex items-center justify-between  self-stretch text-lg leading-[18px]">
                                <div className="flex w-full items-center justify-start gap-x-7">
                                    <img
                                        className="h-16 w-16 rounded-full"
                                        src="https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/images/33%3A98.webp"
                                    />
                                    <p className="flex items-center text-left tracking-[0px] text-neutral-400">Tran Gia Bao</p>
                                    <p className=" pt-0.5 text-right tracking-[4px] text-white">DESIGNER</p>
                                </div>
                                <div className="flex flex-shrink-0 items-center justify-center gap-x-4">
                                    <img
                                        className="mt-2.5 h-8 w-8 flex-grow self-stretch rounded opacity-70"
                                        src="https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/images/33%3A104.webp"
                                    />
                                    <img
                                        className="mt-2.5 h-8 w-8 flex-grow self-stretch rounded opacity-70"
                                        src="https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/images/33%3A105.webp"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="relative flex h-[1378px] w-full flex-col items-center justify-center gap-9 bg-white">
                <div className="absolute left-0 top-0">
                    <div className="relative flex h-[-95px] items-center justify-between text-left text-base font-normal leading-6 tracking-widest text-white">
                        <div className="flex flex-grow items-center justify-center self-stretch bg-green-400 px-24 py-14 after:absolute after:right-[0] after:top-[0] after:h-[0] after:w-[0] after:translate-x-full after:border-r-[60px] after:border-t-[136px] after:border-solid  after:border-green-400 after:content-[''] after:[clip-path:polygon(0_0,_0%_100%,_78%_0)]">
                            <h3 className="flex flex-grow items-center [max-width:285px]">Features</h3>
                        </div>
                    </div>
                </div>
                <div className={`inline-flex h-[952px] w-full max-w-[1370px] flex-col items-center justify-center px-4 pb-8 pt-9 text-left`}>
                    <div className="grid w-full grid-cols-3 gap-x-[114px] gap-y-28">
                        <div className="flex flex-col items-start justify-center gap-y-9">
                            <div className="h-[600px] w-full flex-shrink-0 ">
                                <img src="/assets/images/home/features/features-1.png" className="h-full w-full object-cover" alt="" />
                            </div>
                            <h4 className="flex items-center text-[34px] font-bold leading-[37px] tracking-[-1px] text-black">Thiết kế sản phẩm</h4>
                            <p className="flex w-96 items-center text-lg font-normal leading-[35px] tracking-[0px] text-neutral-400">
                                Thiết kế sản phẩm là quá trình kết hợp giữa mục tiêu kinh doanh của doanh nghiệp và nhu cầu người dùng để tạo thành
                                các thiết kế đẹp mắt, nhất quán
                            </p>
                        </div>
                        <div className="flex flex-col items-start justify-center gap-y-9">
                            <div className="h-[600px] w-full flex-shrink-0 ">
                                <img src="/assets/images/home/features/features-2.png" className="h-full w-full object-cover" alt="" />
                            </div>
                            <h4 className="flex items-center text-[34px] font-bold leading-[37px] tracking-[-1px] text-black">
                                Xây dựng thương hiệu
                            </h4>
                            <p className="flex w-96 items-center text-lg font-normal leading-[35px] tracking-[0px] text-neutral-400">
                                Xây dựng thương hiệu là quá trình tiếp thị thương hiệu của bạn, cho dù vì mục đích xây dựng nhận thức thương hiệu,
                                quảng bá sản phẩm hay kết nối
                            </p>
                        </div>
                        <div className="flex flex-col items-start justify-center gap-y-9">
                            <div className="h-[600px] w-full flex-shrink-0 ">
                                <img src="/assets/images/home/features/features-3.png" className="h-full w-full object-cover" alt="" />
                            </div>
                            <h4 className="flex items-center text-[34px] font-bold leading-[37px] tracking-[-1px] text-black">
                                Truyền thông sự kiện
                            </h4>
                            <p className="flex w-96 items-center text-lg font-normal leading-[35px] tracking-[0px] text-neutral-400">
                                Truyền thông trước sự kiện mang ý nghĩa thông báo đến khách hàng, đối tác về sự tồn tại của doanh nghiệp, đồng thời
                                thu hút đối tượng mục tiêu quan tâm
                            </p>
                        </div>
                    </div>
                </div>
                <button className="flex  items-center justify-center rounded-[50px] border-2 border-solid border-green-400 bg-green-400 px-10 py-2.5 text-white">
                    Đi đến trang chủ
                </button>
            </section>

            <section id="portfolio" className="relative grid h-[960px] w-full grid-cols-4">
                <div className="absolute left-0 top-0">
                    <div className="relative flex h-[-95px] items-center justify-between text-left text-base font-normal leading-6 tracking-widest text-white">
                        <div className="flex flex-grow items-center justify-center self-stretch bg-green-400 px-24 py-14 after:absolute after:right-[0] after:top-[0] after:h-[0] after:w-[0] after:translate-x-full after:border-r-[60px] after:border-t-[136px] after:border-solid  after:border-green-400 after:content-[''] after:[clip-path:polygon(0_0,_0%_100%,_78%_0)]">
                            <h3 className="flex flex-grow items-center [max-width:285px]">PORTFOLIO</h3>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 row-span-2">
                    <img src="/assets/images/home/portfolio/portfolio-1.jpg" className="h-full w-full object-cover" alt="" />
                </div>
                <div className="col-span-2 row-span-2">
                    <img src="/assets/images/home/portfolio/portfolio-2.png" className="h-full w-full object-cover" alt="" />
                </div>

                <div className="col-span-1 row-span-1">
                    <img src="/assets/images/home/portfolio/portfolio-3.png" className="h-full w-full object-cover" alt="" />
                </div>
                <div className="col-span-1 row-span-1">
                    <img src="/assets/images/home/portfolio/portfolio-4.png" className="h-full w-full object-cover" alt="" />
                </div>
            </section>

            {/* <section id="pricing" className={`relative inline-flex h-[1110px] w-full flex-row items-start justify-center  pb-36 pt-56`}>
                <div className="absolute left-0 top-0 z-10">
                    <div className="relative flex h-[-95px] items-center justify-between text-left text-base font-normal leading-6 tracking-widest text-white">
                        <div className="flex flex-grow items-center justify-center self-stretch bg-green-400 px-24 py-14 after:absolute after:right-[0] after:top-[0] after:h-[0] after:w-[0] after:translate-x-full after:border-r-[60px] after:border-t-[136px] after:border-solid  after:border-green-400 after:content-[''] after:[clip-path:polygon(0_0,_0%_100%,_78%_0)]">
                            <h3 className="flex flex-grow items-center [max-width:285px]">Pricing</h3>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-[#FFFFFF]" />
                <div className="bg-background-1 absolute inset-0 bg-no-repeat [background-position:9564px_1354px] [background-size:17%_45%]" />
                <div className="relative grid w-full max-w-app grid-cols-3 gap-x-16 self-stretch">
                    <div className="col-span-1 flex flex-col items-center justify-end border-2 border-solid border-black bg-white pb-9 pl-3 [max-width:350px]">
                        <div className="flex flex-grow items-center justify-end self-stretch pl-9 tracking-[0px]">
                            <div className="relative flex flex-grow items-end justify-between self-stretch pr-24 pt-24">
                                <div className="relative flex flex-grow flex-col items-start justify-between gap-y-4 self-stretch text-left">
                                    <div className="flex items-center text-[21px] font-medium leading-[35px] text-black [max-width:227px]">BASIC</div>
                                    <div className="flex items-center self-stretch text-[100px] font-bold leading-[120px] text-green-400 [max-width:227px]">
                                        50k
                                    </div>
                                </div>
                                <div className="absolute -right-3 -top-14 flex h-52 w-36 items-center justify-end bg-white pl-12 text-right text-[200px] font-bold leading-[200px] text-white">
                                    <div className="text-border flex flex-grow items-center justify-end [max-width:100px]">1</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center pr-36 text-left text-base font-normal leading-[35px] tracking-widest text-neutral-400">
                            <div className="flex flex-grow items-center [max-width:227px]">PER MONTH</div>
                        </div>
                        <div className="flex items-center pr-1 pt-9 text-left text-lg font-normal leading-[35px] tracking-[0px] text-black">
                            <span className="whitespace-pre">{' Unlimited Support'}</span>
                        </div>
                        <div className="flex items-center pr-1.5 pt-5 text-left text-lg font-normal leading-[35px] tracking-[0px] text-black">
                            <span className="whitespace-pre">{' 5GB Server Space'}</span>
                        </div>
                        <div className="flex items-center pl-1 pt-5 text-left text-lg font-normal leading-[35px] tracking-[0px] text-black">
                            <span className="whitespace-pre">{' 2 Users per Project'}</span>
                        </div>
                        <div className="flex items-center pr-5 pt-5 text-left text-lg font-normal leading-[35px] tracking-[0px] text-neutral-500">
                            <span className="whitespace-pre">{' Email Integration'}</span>
                        </div>
                        <div className="flex items-center pl-1 pt-5 text-left text-lg font-normal leading-[35px] tracking-[0px] text-neutral-500">
                            <span className="whitespace-pre">{' Unlimited Download'}</span>
                        </div>
                        <div className="flex items-end pr-5 pt-12 text-left text-sm font-normal leading-[35px] tracking-widest text-white">
                            <div className="flex flex-grow items-center justify-center self-stretch rounded-[50px] border-2 border-solid border-green-400 bg-green-400 py-2.5 pl-10 pr-11">
                                <div className="flex flex-grow items-center">
                                    <a href="https://demo.cocobasic.com/seppo-html/demo-1/">CHOOSE PLAN</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-col items-center justify-end border-2 border-solid border-black bg-white pb-9 pl-3 [max-width:350px]">
                        <div className="flex flex-grow items-center justify-end self-stretch pl-9 tracking-[0px]">
                            <div className="relative flex flex-grow items-end justify-between self-stretch pr-24 pt-24">
                                <div className="relative flex flex-grow flex-col items-start justify-between gap-y-4 self-stretch text-left">
                                    <div className="flex items-center text-[21px] font-medium leading-[35px] text-black [max-width:227px]">BASIC</div>
                                    <div className="flex items-center self-stretch text-[100px] font-bold leading-[120px] text-green-400 [max-width:227px]">
                                        50k
                                    </div>
                                </div>
                                <div className="absolute -right-3 -top-14 flex h-52 w-36 items-center justify-end bg-white pl-12 text-right text-[200px] font-bold leading-[200px] text-white">
                                    <div className="text-border flex flex-grow items-center justify-end [max-width:100px]">2</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center pr-36 text-left text-base font-normal leading-[35px] tracking-widest text-neutral-400">
                            <div className="flex flex-grow items-center [max-width:227px]">PER MONTH</div>
                        </div>
                        <div className="flex items-center pr-1 pt-9 text-left text-lg font-normal leading-[35px] tracking-[0px] text-black">
                            <span className="whitespace-pre">{' Unlimited Support'}</span>
                        </div>
                        <div className="flex items-center pr-1.5 pt-5 text-left text-lg font-normal leading-[35px] tracking-[0px] text-black">
                            <span className="whitespace-pre">{' 5GB Server Space'}</span>
                        </div>
                        <div className="flex items-center pl-1 pt-5 text-left text-lg font-normal leading-[35px] tracking-[0px] text-black">
                            <span className="whitespace-pre">{' 2 Users per Project'}</span>
                        </div>
                        <div className="flex items-center pr-5 pt-5 text-left text-lg font-normal leading-[35px] tracking-[0px] text-neutral-500">
                            <span className="whitespace-pre">{' Email Integration'}</span>
                        </div>
                        <div className="flex items-center pl-1 pt-5 text-left text-lg font-normal leading-[35px] tracking-[0px] text-neutral-500">
                            <span className="whitespace-pre">{' Unlimited Download'}</span>
                        </div>
                        <div className="flex items-end pr-5 pt-12 text-left text-sm font-normal leading-[35px] tracking-widest text-white">
                            <div className="flex flex-grow items-center justify-center self-stretch rounded-[50px] border-2 border-solid border-green-400 bg-green-400 py-2.5 pl-10 pr-11">
                                <div className="flex flex-grow items-center">
                                    <a href="https://demo.cocobasic.com/seppo-html/demo-1/">CHOOSE PLAN</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-col items-center justify-end border-2 border-solid border-black bg-white pb-9 pl-3 [max-width:350px]">
                        <div className="flex flex-grow items-center justify-end self-stretch pl-9 tracking-[0px]">
                            <div className="relative flex flex-grow items-end justify-between self-stretch pr-24 pt-24">
                                <div className="relative flex flex-grow flex-col items-start justify-between gap-y-4 self-stretch text-left">
                                    <div className="flex items-center text-[21px] font-medium leading-[35px] text-black [max-width:227px]">BASIC</div>
                                    <div className="flex items-center self-stretch text-[100px] font-bold leading-[120px] text-green-400 [max-width:227px]">
                                        50k
                                    </div>
                                </div>
                                <div className="absolute -right-3 -top-14 flex h-52 w-36 items-center justify-end bg-white pl-12 text-right text-[200px] font-bold leading-[200px] text-white">
                                    <div className="text-border flex flex-grow items-center justify-end [max-width:100px]">3</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center pr-36 text-left text-base font-normal leading-[35px] tracking-widest text-neutral-400">
                            <div className="flex flex-grow items-center [max-width:227px]">PER MONTH</div>
                        </div>
                        <div className="flex items-center pr-1 pt-9 text-left text-lg font-normal leading-[35px] tracking-[0px] text-black">
                            <span className="whitespace-pre">{' Unlimited Support'}</span>
                        </div>
                        <div className="flex items-center pr-1.5 pt-5 text-left text-lg font-normal leading-[35px] tracking-[0px] text-black">
                            <span className="whitespace-pre">{' 5GB Server Space'}</span>
                        </div>
                        <div className="flex items-center pl-1 pt-5 text-left text-lg font-normal leading-[35px] tracking-[0px] text-black">
                            <span className="whitespace-pre">{' 2 Users per Project'}</span>
                        </div>
                        <div className="flex items-center pr-5 pt-5 text-left text-lg font-normal leading-[35px] tracking-[0px] text-neutral-500">
                            <span className="whitespace-pre">{' Email Integration'}</span>
                        </div>
                        <div className="flex items-center pl-1 pt-5 text-left text-lg font-normal leading-[35px] tracking-[0px] text-neutral-500">
                            <span className="whitespace-pre">{' Unlimited Download'}</span>
                        </div>
                        <div className="flex items-end pr-5 pt-12 text-left text-sm font-normal leading-[35px] tracking-widest text-white">
                            <div className="flex flex-grow items-center justify-center self-stretch rounded-[50px] border-2 border-solid border-green-400 bg-green-400 py-2.5 pl-10 pr-11">
                                <div className="flex flex-grow items-center">
                                    <a href="https://demo.cocobasic.com/seppo-html/demo-1/">CHOOSE PLAN</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <section id="team" className={`relative flex  w-full justify-center gap-y-6 pb-48 pt-60 tracking-[0px]`}>
                <div className="absolute left-0 top-0 z-10">
                    <div className="relative flex h-[-95px] items-center justify-between text-left text-base font-normal leading-6 tracking-widest text-white">
                        <div className="flex flex-grow items-center justify-center self-stretch bg-green-400 px-24 py-14 after:absolute after:right-[0] after:top-[0] after:h-[0] after:w-[0] after:translate-x-full after:border-r-[60px] after:border-t-[136px] after:border-solid  after:border-green-400 after:content-[''] after:[clip-path:polygon(0_0,_0%_100%,_78%_0)]">
                            <h3 className="flex flex-grow items-center [max-width:285px]">TEAM</h3>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 z-0 bg-[#000000] bg-[url(https://demo.cocobasic.com/seppo-html/demo-1/images/on_black_left.png)] bg-left bg-no-repeat" />
                <div className="bg-background-1 absolute inset-0 z-0 bg-no-repeat [background-position:0px_441px] [background-size:17%_64%]" />

                <div className="relative z-10 flex w-fit translate-x-10 flex-col items-center justify-center">
                    <div className="relative z-10 mb-[76px] flex w-fit gap-[115px]">
                        <div className="relative h-[678px] w-[512px] flex-shrink-0 bg-gray-200">
                            <img src="/assets/images/home/team/team-1.png" className="h-full w-full object-cover" alt="" />
                            <div className="absolute left-0 top-[calc(100%+18px)] h-[88px] w-[330px] flex-shrink-0 bg-[#47EA4E]"></div>
                        </div>

                        <div className={`mt-[160px] inline-flex w-full flex-col items-start justify-between gap-y-2 bg-white px-28 pb-24  pt-16`}>
                            <div className="flex items-center ">
                                <div className="relative ml-[-27.5px] flex w-96 items-end justify-between self-stretch pl-7 pt-8">
                                    <div className="absolute left-0 top-0 flex h-9 w-24 items-center text-left text-base font-normal leading-[35px] tracking-widest text-neutral-400">
                                        Developer
                                    </div>
                                    <div className="relative flex flex-grow items-center justify-end text-right text-5xl font-bold leading-[72px] tracking-[0px] text-black">
                                        Dam Xuan Duy
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center self-stretch text-left text-lg font-normal leading-[35px] tracking-[0px] text-neutral-400">
                                <span>
                                    Code the energy hidden in matter citizens of
                                    <br />
                                    distant epochs sun. Citizens of distant
                                    <br />
                                    epochs encyclopaedia galant ctica the ash of
                                    <br />
                                    stellar alchemy Vangelis white dwarf adipisci
                                    <br />
                                    velit. Nemo enim ipsam volupta tem quia
                                    <br />
                                    voluptas sit aspernatur aut odit aut fugit
                                    <br />
                                    radio telescope quis nostrum exercitatio nem
                                    <br />
                                    ullam corporis suscipit laboriosam quis.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10 mb-[60px] flex w-fit gap-14">
                        <div
                            className={`mt-[302px] inline-flex w-[600px] flex-shrink-0 flex-col items-start justify-between gap-y-2 bg-white px-20  pb-24 pt-16`}
                        >
                            <div className="flex w-full items-center">
                                <div className="relative ml-[-27.5px] flex w-full items-end justify-between self-stretch pl-7 pt-8">
                                    <div className="absolute left-0 top-0 flex h-9 w-24 items-center text-left text-base font-normal leading-[35px] tracking-widest text-neutral-400">
                                        DESIGNER
                                    </div>
                                    <p className="relative flex flex-grow items-center justify-end text-right text-5xl font-bold leading-[72px] tracking-[0px] text-black">
                                        Duong Minh Khoi
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center self-stretch text-left text-lg font-normal leading-[35px] tracking-[0px] text-neutral-400">
                                <span>
                                    Code the energy hidden in matter citizens of
                                    <br />
                                    distant epochs sun. Citizens of distant
                                    <br />
                                    epochs encyclopaedia galant ctica the ash of
                                    <br />
                                    stellar alchemy Vangelis white dwarf adipisci
                                    <br />
                                    velit. Nemo enim ipsam volupta tem quia
                                    <br />
                                    voluptas sit aspernatur aut odit aut fugit
                                    <br />
                                    radio telescope quis nostrum exercitatio nem
                                    <br />
                                    ullam corporis suscipit laboriosam quis.
                                </span>
                            </div>
                        </div>
                        <div className="relative h-[884px] w-[688px] flex-shrink-0 bg-gray-200">
                            <img src="/assets/images/home/team/team-2.png" className="h-full w-full object-cover" alt="" />
                            <div className="absolute bottom-[-36px] left-[136px] h-[88px] w-[330px] flex-shrink-0 bg-[#47EA4E]"></div>
                        </div>
                    </div>
                    <div className="relative z-10 mb-[76px] flex w-fit -translate-x-44 gap-[180px]">
                        <div className="relative h-[720px] w-[720px] flex-shrink-0 bg-gray-200">
                            <img src="/assets/images/home/team/team-3.png" className="h-full w-full object-cover" alt="" />
                            <div className="absolute left-[214px] top-[calc(100%+24px)] h-[88px] w-[330px] flex-shrink-0 bg-[#47EA4E]"></div>
                        </div>

                        <div className={`mt-[160px] inline-flex w-full flex-col items-start justify-between gap-y-2 bg-white px-28 pb-24  pt-16`}>
                            <div className="flex items-center ">
                                <div className="relative ml-[-27.5px] flex w-96 items-end justify-between self-stretch pl-7 pt-8">
                                    <div className="absolute left-0 top-0 flex h-9 w-24 items-center text-left text-base font-normal leading-[35px] tracking-widest text-neutral-400">
                                        CEO
                                    </div>
                                    <div className="relative flex flex-grow items-center justify-end text-right text-5xl font-bold leading-[72px] tracking-[0px] text-black">
                                        Tran Gia Bao
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center self-stretch text-left text-lg font-normal leading-[35px] tracking-[0px] text-neutral-400">
                                <span>
                                    The public is more familiar with bad design
                                    <br /> than good design. It is, in effect, conditioned to
                                    <br />
                                    prefer bad design, because that is what it lives
                                    <br />
                                    with. The new becomes threatening, the old
                                    <br />
                                    reassuring.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="skills" className={`relative flex h-[895px] w-full items-center justify-center gap-y-1.5  bg-white py-52`}>
                <div className="absolute left-0 top-0 z-10">
                    <div className="relative flex h-[-95px] items-center justify-between text-left text-base font-normal leading-6 tracking-widest text-white">
                        <div className="flex flex-grow items-center justify-center self-stretch bg-green-400 px-24 py-14 after:absolute after:right-[0] after:top-[0] after:h-[0] after:w-[0] after:translate-x-full after:border-r-[60px] after:border-t-[136px] after:border-solid  after:border-green-400 after:content-[''] after:[clip-path:polygon(0_0,_0%_100%,_78%_0)]">
                            <h3 className="flex flex-grow items-center [max-width:285px]">SKILLS</h3>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center pl-[0.41px] text-left "></div>
                <div className="flex w-full max-w-app items-end justify-between gap-x-24 gap-y-16 self-stretch pb-1.5 text-left tracking-[0px] [min-width:133px]">
                    <div className="flex flex-col items-start justify-center text-[60px] font-bold leading-[72px] text-black">
                        <div className="flex flex-grow items-center text-base font-normal leading-[35px] tracking-widest text-neutral-400 [max-width:538px]">
                            OUR NUMBERS
                        </div>
                        <div className="flex flex-grow items-center [max-width:538px]">Khả năng của chúng tôi</div>
                        <div className="flex flex-grow items-end justify-between gap-x-14 gap-y-14 self-stretch pt-7">
                            <div className="flex flex-grow items-end justify-between self-stretch text-left font-normal leading-[35px]">
                                <div className="flex flex-grow items-start justify-center self-stretch pb-32 text-lg leading-[35px] tracking-[0px] text-neutral-400">
                                    <div className="flex flex-grow items-center [max-width:538px]">
                                        Công chúng quen thuộc với thiết kế tồi hơn là thiết kế tốt. Trên thực tế, nó có điều kiện để thích thiết kế
                                        tồi hơn, bởi vì đó là những gì nó tồn tại. Cái mới trở nên đe dọa, cái cũ trở nên yên tâm.
                                    </div>
                                </div>
                                <div className="flex w-0 items-center pr-0 text-sm leading-[35px] tracking-widest text-white">
                                    <div className="ml-[-538.59px] flex w-48 items-start justify-center self-stretch pb-12">
                                        <div className="flex flex-grow items-center justify-center rounded-[50px] border-2 border-solid border-green-400 bg-green-400 py-2.5 pl-2.5 pr-3">
                                            <div className="flex flex-grow items-center justify-center">
                                                <a href="https://demo.cocobasic.com/seppo-html/demo-1/#portfolio">Tìm Hiểu Thêm</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-grow flex-col items-center justify-between gap-y-12 self-stretch text-neutral-400">
                        {[
                            {
                                percent: 75,
                                name: 'Creativity',
                            },
                            {
                                percent: 45,
                                name: 'Cooking',
                            },
                            {
                                percent: 90,
                                name: 'PhP',
                            },
                            {
                                percent: 65,
                                name: 'Marketing',
                            },
                            {
                                percent: 85,
                                name: 'Design',
                            },
                        ].map((item) => (
                            <div key={item.name} className="flex w-full flex-grow items-start justify-between gap-x-14 pt-1.5">
                                <div className="flex items-center text-5xl font-light leading-[48px]">{item.percent}%</div>
                                <div className="flex h-9 flex-grow items-end justify-center text-[22px] font-normal leading-[35px]">
                                    <div className="flex h-10 flex-grow flex-col items-start justify-between">
                                        <div className="flex items-center [max-width:393px]">{item.name}</div>
                                        <div className="relative flex h-[13px] w-[400px] flex-shrink-0 border-t-4 border-neutral-300/30 ">
                                            <div
                                                style={{
                                                    width: `${item.percent}%`,
                                                }}
                                                className="h-full bg-black"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="milestones" className={`relative inline-flex h-[782px] w-full items-end justify-center gap-y-6 pb-48 pt-60 tracking-[0px]`}>
                <div className="absolute left-0 top-0 z-10">
                    <div className="relative flex h-[-95px] items-center justify-between text-left text-base font-normal leading-6 tracking-widest text-white">
                        <div className="flex flex-grow items-center justify-center self-stretch bg-green-400 px-24 py-14 after:absolute after:right-[0] after:top-[0] after:h-[0] after:w-[0] after:translate-x-full after:border-r-[60px] after:border-t-[136px] after:border-solid  after:border-green-400 after:content-[''] after:[clip-path:polygon(0_0,_0%_100%,_78%_0)]">
                            <h3 className="flex flex-grow items-center [max-width:285px]">MILESTONES</h3>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 z-0 bg-[#000000] bg-[url(https://demo.cocobasic.com/seppo-html/demo-1/images/on_black_left.png)] bg-left-bottom bg-no-repeat" />
                <div className="bg-background-1 absolute inset-0 bg-no-repeat [background-position:0px_441px] [background-size:17%_64%]" />
                <div className="relative z-10 grid w-full max-w-[1170px] grid-cols-2 gap-x-12 gap-y-24">
                    <div className="relative flex items-start justify-center gap-x-8 gap-y-8">
                        <div className="text-border flex items-center text-center text-[80px] font-bold leading-[80px] text-black">1500</div>
                        <div className="flex flex-col items-start gap-y-5 self-stretch [min-width:214px]">
                            <div className="flex items-center self-stretch text-[28px] font-bold leading-8 text-white">Thành viên mới 1 tháng</div>
                            <div className="flex items-center text-lg font-normal leading-[35px] text-neutral-400">
                                1500 người đã tin dùng chúng tôi
                            </div>
                        </div>
                    </div>
                    <div className="relative flex items-start justify-center gap-x-8 gap-y-8">
                        <div className="text-border flex items-center text-center text-[80px] font-bold leading-[80px] text-black">300</div>
                        <div className="flex flex-col items-start gap-y-5 self-stretch [min-width:214px]">
                            <div className="flex items-center self-stretch text-[28px] font-bold leading-8 text-white">Project đã thực hiện</div>
                            <div className="flex items-center text-lg font-normal leading-[35px] text-neutral-400">
                                Với sự đầu tư bằng tất cả khả năng chúng tôi
                            </div>
                        </div>
                    </div>
                    <div className="relative flex items-start justify-center gap-x-8 gap-y-8">
                        <div className="text-border ml-[60px] flex items-center text-center text-[80px] font-bold leading-[80px] text-black">74</div>
                        <div className="flex flex-col items-start gap-y-5 self-stretch [min-width:214px]">
                            <div className="flex items-center self-stretch text-[28px] font-bold leading-8 text-white">
                                Ly cà phê tiêu thụ mỗi tuần
                            </div>
                            <div className="flex items-center text-lg font-normal leading-[35px] text-neutral-400">
                                Ai mà chả cần một ít tăng năng lượng?
                            </div>
                        </div>
                    </div>
                    <div className="relative flex items-start justify-center gap-x-8 gap-y-8">
                        <div className="text-border flex items-center text-center text-[80px] font-bold leading-[80px] text-black">389</div>
                        <div className="flex flex-col items-start gap-y-5 self-stretch [min-width:214px]">
                            <div className="flex items-center self-stretch text-[28px] font-bold leading-8 text-white">Khách hàng feedback tốt</div>
                            <div className="flex items-center text-lg font-normal leading-[35px] text-neutral-400">
                                Sự tận tâm trong công việc đã mang đến cho chúng tôi tất cả con số trên
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" className="relative flex h-full flex-col items-center justify-center bg-white pb-[128px] pt-[200px]">
                <div className="absolute left-0 top-0 z-10">
                    <div className="relative flex h-[-95px] items-center justify-between text-left text-base font-normal leading-6 tracking-widest text-white">
                        <div className="flex flex-grow items-center justify-center self-stretch bg-green-400 px-24 py-14 after:absolute after:right-[0] after:top-[0] after:h-[0] after:w-[0] after:translate-x-full after:border-r-[60px] after:border-t-[136px] after:border-solid  after:border-green-400 after:content-[''] after:[clip-path:polygon(0_0,_0%_100%,_78%_0)]">
                            <h3 className="flex flex-grow items-center [max-width:285px]">Liên hệ</h3>
                        </div>
                    </div>
                </div>
                <div className="mb-4 flex w-full max-w-app">
                    <div className="mb-[30px] mr-[8%] flex w-[42%] flex-shrink-0 flex-col text-[#b3b3b3]">
                        <p className="mb-0 text-base uppercase tracking-[2px]">Liên hê với chúng tôi</p>
                        <h2 className="pb-[35px] text-6xl font-bold leading-[120%] text-black">Tham gia cộng đồng Desvi ngay</h2>
                        <p className="mb-[13px]">
                            Bởi vì chúng tôi tin rằng với sự giúp đỡ của chúng tôi, ai cũng có thể xây dựng một profile hoặc doanh nghiệp có tiềm năng
                            trong tương lại
                        </p>
                    </div>

                    <FormProvider {...methods}>
                        <form
                            onSubmit={methods.handleSubmit(onSubmit)}
                            className={`inline-flex w-full flex-col items-center justify-between gap-y-2 `}
                        >
                            <NKTextField theme="CONTACT" label="" name="name" placeholder="Tên" />
                            <NKTextField theme="CONTACT" label="" name="email" placeholder="Email" />
                            <NKTextField theme="CONTACT" label="" name="subject" placeholder="Tiêu đề" />
                            <NKTextareaField theme="CONTACT" rows={8} label="" name="description" placeholder="Mô Tả" />

                            <div className="font-inter flex items-end justify-center self-stretch pt-2.5 text-center text-sm font-normal leading-[35px] tracking-widest text-white">
                                <button className="flex flex-grow items-center justify-center self-stretch rounded-[50px] border-2 border-solid border-green-400 bg-green-400 p-2.5">
                                    <div className="flex flex-grow items-center justify-center [max-width:454px]">Gửi</div>
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
                <div className="h-[450px] w-full max-w-app">
                    <img src="/assets/images/home/contact/map.png" className="h-full w-full object-cover" alt="" />
                </div>
            </section>
        </div>
    );
};

export default HomePage;
