import { useCallback, useEffect, useState } from "react";

interface ScrollBehaviorProps {
  scrollThreshold?: number;
  hideThreshold?: number;
  throttleMs?: number;
}
export function useScrollBehavior({
  scrollThreshold = 50,
  hideThreshold = 100,
  throttleMs = 16,
}: ScrollBehaviorProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    setIsScrolled(currentScrollY > scrollThreshold);

    if (currentScrollY > lastScrollY && currentScrollY > hideThreshold) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY, scrollThreshold, hideThreshold]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const throttledHandleScroll = () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, throttleMs);
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [handleScroll, throttleMs]);

  return { isScrolled, isVisible, scrollY: lastScrollY };
}
