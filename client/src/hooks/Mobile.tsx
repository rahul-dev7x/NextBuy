import { useEffect, useState } from "react"

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    const checkMobile = () => {
        if (window.innerWidth <= 768) {
            setIsMobile(true);
        }
        else {
            setIsMobile(false)
        }
    }
    useEffect(() => {
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => { window.removeEventListener('resize', checkMobile); }
    }, [])
    return isMobile;
}

export default useIsMobile;