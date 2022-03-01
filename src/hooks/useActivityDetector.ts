import { useEffect, useState } from 'react';
import createActivityDetector from 'activity-detector';

export const useActivityDetector = (options: any) => {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    const activityDetector = createActivityDetector({ ...options, inactivityEvents: [] });
    activityDetector.on('idle', () => setIsIdle(true));
    activityDetector.on('active', () => setIsIdle(false));
    return () => activityDetector.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isIdle;
};
