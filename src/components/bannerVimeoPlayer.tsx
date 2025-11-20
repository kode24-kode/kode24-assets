import Player from "@vimeo/player";
import { useEffect, useRef, useState } from "react";
//import type { Url } from "url";

export default function VimeoVideo({
  id,
  adLink,
}: {
  id: string | number;
  adLink: string;
}) {
  const mobileQuery = "(max-width: 820px)"; // juster breakpoint etter behov
  const initialPadding =
    typeof window !== "undefined" && window.matchMedia(mobileQuery).matches
      ? "177.78%" // mobil fallback
      : "56.25%"; // desktop fallback
  const [paddingTop, setPaddingTop] = useState(initialPadding); // fallback: 16:9
  //const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const p = new Player(iframeRef.current, {
      controls: false,
      muted: true,
      loop: true,
      autopause: false,
    });
    p.getVideoWidth().then((w) => {
      p.getVideoHeight().then((h) => {
        const ratio = (h / w) * 100; // prosent padding
        setPaddingTop(`${ratio}%`);
      });
    });

    setPlayer(p);

    // 1. Start buffer litt før den er synlig
    const preloadObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            p.play(); // buffer video
            preloadObserver.disconnect();
          }
        });
      },
      {
        root: null,
        rootMargin: "300px 0px", // starter 300px før viewport
        threshold: 0,
      }
    );

    preloadObserver.observe(iframeRef.current);

    // 2. Når video faktisk kommer i view -> autoplay
    const playObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            p.play();
            playObserver.disconnect();
          }
        });
      },
      {
        threshold: 0.4, // spiller når ca 40% av videoen er synlig
      }
    );

    playObserver.observe(iframeRef.current);

    return () => {
      preloadObserver.disconnect();
      playObserver.disconnect();
    };
  }, []);

  const toggleVolume = () => {
    if (!player) return;
    player.setVolume(isMuted ? 1 : 0);
    setIsMuted(!isMuted);
  };

  return (
    <div style={{ position: "relative", paddingBottom: paddingTop, height: 0 }}>
      <button
        type="button"
        className=""
        onClick={toggleVolume}
        style={{
          position: "absolute",
          right: "var(--gutter)",
          bottom: "var(--gutter)",
          zIndex: "1",
          backgroundColor: "var(--v2-card-background)",
          backdropFilter: "blur(10px)",
          padding: "calc(var(--gutter) / 2)",
          borderRadius: "var(--border-radius)",
          border: "0",
        }}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
      <a
        href={adLink || "https://www.kode24.no"}
        style={{
          display: "block",
          position: "absolute",
          left: "0",
          top: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <span></span>
      </a>
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${id}?muted=1&loop=1&autopause=0&controls=0`}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          border: 0,
          pointerEvents: "none",
        }}
        title="NAV_KraesjeSystemer"
      ></iframe>
    </div>
  );
}
