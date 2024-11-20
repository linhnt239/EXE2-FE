import * as React from 'react';

interface UseCountDownProps {
    total: number;
    onEnd?: () => void;
    onReset?: () => void;
    onTick?: (time: number) => void;
    onTickInterval?: number;
}

export const useCountDown = ({ total, onEnd, onTick, onTickInterval, onReset }: UseCountDownProps) => {
    const [time, setTime] = React.useState(total);
    const [isFinished, setIsFinished] = React.useState(false);

    React.useEffect(() => {
        if (time <= 0) {
            setIsFinished(true);
            onEnd?.();
            return;
        }

        const interval = setInterval(() => {
            setTime((prev) => {
                const next = prev - 1;
                onTick?.(next);
                return next;
            });
        }, onTickInterval || 1000);

        return () => {
            clearInterval(interval);
        };
    }, [time, total, onEnd, onTick, onTickInterval]);

    const reset = () => {
        setTime(total);
        setIsFinished(false);
        onReset?.();
    };

    return { time, isFinished, reset };
};
