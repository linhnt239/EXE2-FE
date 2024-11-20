import { HKMoment } from './moment';

export const isActiveTime = (date?: string, different = -2) => {
    return HKMoment.moment(date).diff(HKMoment.moment(), 'minutes') >= different;
};
