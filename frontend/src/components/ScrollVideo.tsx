import { useEffect, useRef } from 'react';

interface ScrollVideoProps {
  videoUrl?: string;
}

export default function ScrollVideo({ videoUrl = '/Bmw.mp4' }: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>();
  const lastScrollTimeRef = useRef<number>(0);
  const targetTimeRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // Ensure video is ready
    video.muted = true;
    video.playsInline = true;

    // Smooth interpolation function
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    let currentTime = 0;

    const updateVideoTime = () => {
      if (!video) return;

      // Smooth interpolation towards target time
      currentTime = lerp(currentTime, targetTimeRef.current, 0.1);
      
      // Only update if difference is significant (reduces jank)
      if (Math.abs(video.currentTime - currentTime) > 0.01) {
        video.currentTime = currentTime;
      }

      rafRef.current = requestAnimationFrame(updateVideoTime);
    };

    const handleScroll = () => {
      const now = Date.now();
      
      // Throttle to max 60fps
      if (now - lastScrollTimeRef.current < 16) return;
      lastScrollTimeRef.current = now;

      if (!video || !container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress
      const scrollStart = -rect.top;
      const scrollRange = containerHeight - windowHeight;
      let scrollProgress = Math.max(0, Math.min(1, scrollStart / scrollRange));

      // Apply easing for smoother feel
      scrollProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress); // Smoothstep

      // Update target time
      if (video.duration) {
        targetTimeRef.current = scrollProgress * video.duration;
      }
    };

    // Wait for video metadata to load
    const handleLoadedMetadata = () => {
      handleScroll();
      updateVideoTime();
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    // Add scroll listener with passive for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: '500vh' }}
    >
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          src={videoUrl}
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)', // Force GPU acceleration
          }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
