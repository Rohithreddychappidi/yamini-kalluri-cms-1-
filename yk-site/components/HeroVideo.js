"use client";

import { useEffect, useRef } from "react";

// Plays the hero background video only while the Hero section is on screen.
// Once the user scrolls past it, the video pauses (visually "ends") and the
// fixed background image behind the glass layer takes over.
export default function HeroVideo({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className="hero-video-bg"
      src={src}
      autoPlay
      muted
      loop
      playsInline
    />
  );
}
