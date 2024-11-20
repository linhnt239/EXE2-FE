import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { advertisingApi } from '@/core/api/advertising.api';

interface AdsBanner extends React.HTMLAttributes<HTMLDivElement> {
    slug: string;
    autoplay?: number;
}

const AdsBanner: React.FunctionComponent<AdsBanner & React.PropsWithChildren> = ({ slug, autoplay, ...rest }) => {
    const [autoplayDelay, setAutoplayDelay] = React.useState(5000);
    const adsQuery = useQuery({
        queryKey: ['ads', slug],
        queryFn: async () => {
            const res = await advertisingApi.v1GetBySlug(slug);

            setAutoplayDelay(res.cycleTime);

            return res.contents;
        },
        initialData: [],
    });

    return (
        <div {...rest}>
            <Swiper
                modules={[Autoplay, EffectFade]}
                loop
                effect="fade"
                autoplay={{
                    delay: autoplayDelay,
                }}
                className="h-full w-full"
            >
                {adsQuery.data.map((src, index) => (
                    <SwiperSlide key={index} className="h-full w-full">
                        <img src={src} alt={`background-${index}`} className="h-full w-full object-cover" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default AdsBanner;
