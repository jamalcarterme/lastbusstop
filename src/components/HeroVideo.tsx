"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

const { youtubeId: id, mp4 } = site.heroVideo;
const ytSrc =
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}` +
  `&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&enablejsapi=1&cc_load_policy=0`;

/**
 * Full-bleed background video that starts the moment the page loads.
 * - The <iframe>/<video> is part of the server-rendered HTML, so the browser begins fetching it immediately.
 * - Autoplay is muted (required by browsers); a sound toggle lets visitors unmute.
 * - A local mp4 (NEXT_PUBLIC_HERO_MP4) takes priority over the YouTube embed when configured.
 */
export default function HeroVideo() {
  const frame = useRef<HTMLIFrameElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  const cmd = (func: string, args: unknown[] = []) =>
    frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), "*");

  const kick = () => {
    frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: 1 }), "*");
    cmd("mute");
    cmd("playVideo");
  };

  useEffect(() => {
    if (mp4) {
      const v = video.current;
      if (v) { v.muted = true; v.play().then(() => setReady(true)).catch(() => {}); }
      return;
    }
    // Re-issue play a few times in case the player wasn't ready on first load,
    // and once more on the first user gesture if a browser blocked autoplay.
    const timers = [400, 1200, 2500].map((t) => setTimeout(kick, t));
    const onGesture = () => { kick(); window.removeEventListener("pointerdown", onGesture); };
    window.addEventListener("pointerdown", onGesture, { once: true });
    const onMsg = (e: MessageEvent) => {
      if (typeof e.data !== "string" || !e.data.includes("playerState")) return;
      try { const d = JSON.parse(e.data); const st = d?.info?.playerState ?? d?.info; if (st === 1) setReady(true); else if (st === 0) cmd("playVideo"); } catch {}
    };
    window.addEventListener("message", onMsg);
    return () => { timers.forEach(clearTimeout); window.removeEventListener("message", onMsg); window.removeEventListener("pointerdown", onGesture); };
  }, []);

  return (
    <>
      <div className="absolute inset-0 overflow-hidden bg-charcoal">
        {/* poster shown instantly while the video buffers */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${id}/maxresdefault.jpg)` }} />
        {mp4 ? (
          <video ref={video} autoPlay muted loop playsInline preload="auto" onPlaying={() => setReady(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
            <source src={mp4} type="video/mp4" />
          </video>
        ) : (
          <iframe ref={frame} title="Last Bus Stop Ministry worship background video" src={ytSrc} onLoad={kick}
            allow="autoplay; encrypted-media; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" tabIndex={-1} aria-hidden
            className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
            style={{ width: "max(115vw, 204vh)", height: "max(64.7vw, 115vh)" }} />
        )}
        <div className="absolute inset-0 z-10" />
      </div>
    </>
  );
}
