import { MutableRefObject, useEffect, useState } from 'react';

import { debounce } from 'lodash';

/**
 * Custom hook that provides the width and height of a container element.
 *
 * This hook uses a `ResizeObserver` to monitor changes to the container's size and updates the state accordingly.
 * It also debounces the resize handler to improve performance.
 */

interface Props {
  containerRef: MutableRefObject<HTMLDivElement | null>;
}

const DEBOUNCE_DELAY = 150;

export const useResponsiveContainer = ({ containerRef }: Props) => {
  const [containerWidth, setContainerWidth] = useState<number>(window.innerWidth);
  const [containerHeight, setContainerHeight] = useState<number>(window.innerHeight);

  const handleResize = debounce((entries: ResizeObserverEntry[]) => {
    if (entries[0]) {
      const { width: newWidth, height: newHeight } = entries[0].contentRect;

      setContainerWidth(newWidth);
      setContainerHeight(newHeight);
    }
  }, DEBOUNCE_DELAY);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResize);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }

      resizeObserver.disconnect();
      handleResize.cancel();
    };
  }, []);

  return { containerWidth, containerHeight };
};
