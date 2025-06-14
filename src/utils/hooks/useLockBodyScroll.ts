import { useLayoutEffect, useRef } from 'react';

export const useLockBodyScroll = (isLocked: boolean) => {
    const scrollYRef = useRef(0);

    useLayoutEffect(() => {
        if (!isLocked) return;

        scrollYRef.current = window.scrollY;
        Object.assign(document.body.style, {
            overflow: 'hidden',
            position: 'fixed',
            top: `-${scrollYRef.current}px`,
            width: '100%',
        });

        return () => {
            Object.assign(document.body.style, {
                overflow: '',
                position: '',
                top: '',
                width: '',
            });
            window.scrollTo(0, scrollYRef.current);
        };
    }, [isLocked]);
}
