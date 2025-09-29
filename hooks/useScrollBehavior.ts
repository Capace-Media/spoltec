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

  // Use refs to avoid unnecessary re-renders
  const rafId = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    lastScrollYRef.current = currentScrollY;

    // Batch state updates to reduce reflows
    requestAnimationFrame(() => {
      setIsScrolled(currentScrollY > scrollThreshold);

      if (
        currentScrollY > lastScrollYRef.current &&
        currentScrollY > hideThreshold
      ) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    });
  }, [scrollThreshold, hideThreshold]);

  useEffect(() => {
    const throttledHandleScroll = () => {
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(() => {
          handleScroll();
          rafId.current = null;
        });
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll]);

  return { isScrolled, isVisible, scrollY: lastScrollY };
}
