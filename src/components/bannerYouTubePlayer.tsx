"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

function loadYouTubeIframeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT?.Player) return resolve();

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-yt-iframe-api="true"]'
    );
    if (existing) {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        resolve();
      };
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    tag.dataset.ytIframeApi = "true";

    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };

    document.head.appendChild(tag);
  });
}

export default function YouTubeVideo({
  id,
  adLink,
}: {
  id: string;
  adLink: string;
}) {
  const [isMuted, setIsMuted] = useState(true);
  const mobileQuery = "(max-width: 820px)";
  const initialPadding =
    typeof window !== "undefined" && window.matchMedia(mobileQuery).matches
      ? "177.78%" // mobil fallback (9:16-ish)
      : "56.25%"; // 16:9 fallback
  const [paddingTop] = useState(initialPadding);

  const mountRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);
  const readyRef = useRef(false);

  useEffect(() => {
    if (!mountRef.current) return;

    let destroyed = false;
    let playObserver: IntersectionObserver | null = null;

    const safePlay = () => {
      const p = playerRef.current;
      if (!p || !readyRef.current) return;

      try {
        p.mute(); // må være muted for autoplay
        p.playVideo();
      } catch (e) {
        console.log("[YT] play error", e);
      }
    };

    const safePause = () => {
      const p = playerRef.current;
      if (!p || !readyRef.current) return;
      try {
        p.pauseVideo();
      } catch {}
    };

    const tryPlayWithRetries = () => {
      // YouTube kan “ignore” første play; dette øker treffrate
      let tries = 0;
      const iv: any = setInterval(() => {
        if (destroyed) return clearInterval(iv);
        tries++;
        safePlay();
        if (tries >= 10) clearInterval(iv);
      }, 250);
    };

    (async () => {
      await loadYouTubeIframeAPI();
      if (destroyed || !mountRef.current) return;

      playerRef.current = new window.YT.Player(mountRef.current, {
        videoId: id,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          controls: 0,
          autoplay: 1,
          loop: 1,
          playlist: id, // nødvendig for loop
          mute: 1,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          origin: window.location.origin, // VIKTIG i mange oppsett
        },
        events: {
          onReady: () => {
            if (destroyed) return;
            readyRef.current = true;

            // start muted
            try {
              playerRef.current.mute();
            } catch {}

            // hvis den allerede er i view når ready kommer:
            tryPlayWithRetries();
          },
          onStateChange: (ev: any) => {
            // 1 = playing, 2 = paused, 5 = cued
            // nyttig å se om den faktisk forsøker
            console.log("[YT] state", ev?.data);
          },
          onError: (ev: any) => {
            // typisk: 2, 5, 100, 101, 150
            console.log("[YT] error", ev?.data);
          },
        },
      });

      playObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              tryPlayWithRetries();
            } else {
              safePause();
            }
          });
        },
        { threshold: 0.4, rootMargin: "200px 0px" }
      );

      playObserver.observe(mountRef.current);
    })();

    return () => {
      destroyed = true;
      playObserver?.disconnect();
      try {
        playerRef.current?.destroy?.();
      } catch {}
      playerRef.current = null;
      readyRef.current = false;
    };
  }, [id]);

  const toggleVolume = () => {
    const p = playerRef.current;
    if (!p || !readyRef.current) return;

    if (isMuted) {
      try {
        p.unMute();
        p.setVolume(100);
      } catch {}
      setIsMuted(false);
    } else {
      try {
        p.mute();
      } catch {}
      setIsMuted(true);
    }
  };

  return (
    <div style={{ position: "relative", paddingBottom: paddingTop, height: 0 }}>
      <button
        type="button"
        onClick={toggleVolume}
        style={{
          position: "absolute",
          right: "var(--gutter)",
          bottom: "var(--gutter)",
          zIndex: 2,
          backgroundColor: "var(--v2-card-background)",
          backdropFilter: "blur(10px)",
          padding: "calc(var(--gutter) / 2)",
          borderRadius: "var(--border-radius)",
          border: 0,
        }}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      <a
        href={adLink || "https://www.kode24.no"}
        style={{
          display: "block",
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
      >
        <span />
      </a>

      <div
        ref={mountRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
