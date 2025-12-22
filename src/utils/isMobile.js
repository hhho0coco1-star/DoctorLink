import { useState, useEffect } from "react";

/**
 * 화면 크기 기준으로 모바일 여부를 판단하는 함수
 * @returns {boolean} 768px 이하면 true (모바일)
 */
export const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
};

/**
 * React Hook으로 모바일 여부를 추적
 * @returns {boolean} 모바일 여부
 */
export const useIsMobile = () => {
    const [isMobileDevice, setIsMobileDevice] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.innerWidth <= 768;
    });

    useEffect(() => {
        const handleResize = () => {
            setIsMobileDevice(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobileDevice;
};